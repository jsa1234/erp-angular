import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from '@core/domain-classes/brand';
import { SubcategoryResourceParameter } from '@core/domain-classes/masters/subcategory-resource-parameter';
import { IProduct, ProductPrice } from '@core/domain-classes/product';
import { ProductCategory } from '@core/domain-classes/product-category';
import { ProductSubcategory } from '@core/domain-classes/product-subcategory';
import { Tax } from '@core/domain-classes/tax';
import { Unit } from '@core/domain-classes/unit';
import { TaxService } from '@core/services/tax.service';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { QueryParams } from '@ngrx/data';
import { reorderMaxValidator } from '@shared/validators/max-stock-level-validation';
import { ToastrService } from 'ngx-toastr';
import { Observable, forkJoin } from 'rxjs';
import { BaseComponent } from 'src/app/base.component';
import { BrandService } from 'src/app/brand/brand.service';
import { CategoryService } from 'src/app/category/category.service';
import { SubCategoryService } from 'src/app/sub-category/sub-category.service';
import { UnitService } from 'src/app/unit/unit.service';
import { v4 as uuid } from 'uuid';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent extends BaseComponent implements OnInit {
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  @ViewChild('closeModalRef') closeModalRef:ElementRef
  isActiveParam: QueryParams = { isActive: '1' };
  productForm: FormGroup;
  productPricesForm: FormGroup;
  product: IProduct;
  imgSrc: any = null;
  chemicalUploadImage: any = null;
  isImageUpdate: boolean = false;
  units: Unit[] = [];
  brands: Brand[] = [];
  taxes: Tax[] = [];
  productVarient: ProductPrice[] = [];
  category: ProductCategory[] = [];
  subcategories: ProductSubcategory[];
  isEdit: boolean = false;
  selectedUnits: string[];
  cessRate: Tax[];
  categoryUUID:string = ''
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService,
    private unitService: UnitService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private subcategoryService: SubCategoryService,
    private taxService: TaxService,
    public translationService: TranslationService
  ) {
    super();
  }

  ngOnInit() {
    this.loadData()
    this.createProductForm();
    this.createProductPricesForm();
    this.getProductDetail();

  }

  loadData(){
    forkJoin([
      this.unitService.getActiveUnits(),
      this.brandService.getActiveBrands(),
      this.categoryService.getActiveCategories(),
      this.taxService.GetTaxesByType([0,1]),
    ]).subscribe(([units, brands, categories, taxes]) => {
      this.units = units;
      this.brands = brands;
      this.category = categories;
      this.taxes = taxes.gstRate;
      this.cessRate = taxes.cessRate;
      this.updateSelectedUnits()
    });
  }
getProductDetail():void{
  this.sub$.sink = this.route.data.subscribe(
    (data: { product: IProduct }) => {
      if (data.product) {
        this.product = { ...data.product };
        this.product.isUpdate = true;
        this.patchProduct();
        this.productForm.get('productCode').disable()
        if (this.product.imagePath) {
          this.imgSrc = environment.apiUrl + this.product.imagePath;
        }
      } else {
        if (this.product) {
          this.productForm.get('productCode').enable()
          this.imgSrc = null;
          this.product = null;
          this.createProductForm();
          this.productVarient = [];
          this.product.isUpdate = false;
        }
      }
    }
  );
}
  
  getSubcategory(id: string) {
    let params = new SubcategoryResourceParameter()
    params.categoryUUID = id
    params.isActive = true
    this.subcategoryService
      .getProductSubCategorybyCategory(params)
      .subscribe((subcategory: ProductSubcategory[]) => {
        this.subcategories = subcategory;
      });
      const subCategoryControl = this.productForm.get('subCategory');
      subCategoryControl.setValue('');
      subCategoryControl.markAsUntouched();
      
  }


  onRemoveImage() {
    this.isImageUpdate = true;
    this.imgSrc = '';
  }

  createProductForm():void {
    let productUUid = uuid();
    this.productForm = this.fb.group({
      productUUID: [productUUid],
      productCode: ['',[Validators.required]],
      nameEnglish: ['', [Validators.required]],
      // nameSecondLanguage: [''],
      descriptionEnglish: [''],
      // descriptionSecondLanguage: [''],
      partNo: [''],
      hsnCode: [''],
      category: ['',[Validators.required]],
      subCategory: ['',[Validators.required]],
      brand: ['',[Validators.required]],
      tax: ['',[Validators.required]],
      addnlCessUUID: [''],
      cessUUID: [''],
      maxStockLevel: ['',Validators.min(0)],
      reorderLevel: ['',Validators.min(0)],
      imagePath: [''],
      branchUUID: [''],
      allowZeroPrice:[false],
      allowNonStock:[false]
    },{ validators: reorderMaxValidator });
  }


  public get allowZeroPrice():boolean {return this.productForm.get('allowZeroPrice').value}
  public get allowNonStock():boolean {return this.productForm.get('allowNonStock').value}

createProductPricesForm():void{
  this.productPricesForm = this.fb.group({
    productPriceUUID: [uuid()],
    barcode: ['',Validators.required],
    unitUUID: ['',Validators.required],
    unitLevel: [''],
    qtyConversion: ['',Validators.required],
    unitCost: ['',Validators.required],
    sellingPrice: ['',Validators.required],
    wholeSaleRate: ['',Validators.required],
    mrp: ['',Validators.required],
    isBaseUnit: [false],
    isActive: [true],
    averageCost:[{value: '', disabled: true}]
  })
}
 get isActive(){return this.productPricesForm.get('isActive').value}

  patchProduct() {
    let { productCategoryUUID, productSubcategoryUUID, taxUUID, brandUUID, ...product } = this.product;
    productCategoryUUID && this.getSubcategory(productCategoryUUID);
    this.categoryUUID = productCategoryUUID
    if(!productSubcategoryUUID){
      const subCategory:ProductSubcategory = JSON.parse(this.product.subCategory)
      subCategory?productSubcategoryUUID = subCategory.subCategoryUUID:''
    }
    this.productForm.patchValue({
      ...product,
      category: productCategoryUUID,
      subCategory: productSubcategoryUUID,
      tax: taxUUID,
      brand: brandUUID,
    });
    this.imgSrc = product.imagePath;
    this.productVarient = product.productPrices;
    this.product.isUpdate = true;
  }
  

  onFileSelect($event) {
    const fileSelected = $event.target.files[0];
    if (!fileSelected) {
      return;
    }
    const mimeType = fileSelected.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileSelected);
    reader.onload = (_event) => {
      this.imgSrc = reader.result;
      this.isImageUpdate = true;
      this.chemicalUploadImage = Object.assign(
        {},
        {
          src: reader.result,
          uid: fileSelected.uid,
        }
      );
      $event.target.value = '';
    };
  }



  buildProductObj(): IProduct {
    let {
      productUUID,
      productCode,
      nameEnglish,
      // nameSecondLanguage,
      descriptionEnglish,
      // descriptionSecondLanguage,
      partNo,
      hsnCode,
      subCategory,
      category,
      brand,
      tax,
      addnlCessUUID,
      cessUUID,
      maxStockLevel,
      reorderLevel,
      imagePath,
    } = this.productForm.getRawValue();
    // productCode = this.productForm.get('productCode').value
    maxStockLevel =maxStockLevel==""?null: +maxStockLevel
    reorderLevel =reorderLevel==""?null: +reorderLevel
    const productVarient = this.productVarient.map((e, index) => {
      return { ...e, unitLevel: index };
    });
  
    const productObj: IProduct = {
      productUUID,
      productCode,
      nameEnglish,
      // nameSecondLanguage,
      descriptionEnglish,
      // descriptionSecondLanguage,
      partNo,
      hsnCode,
      subCategory,
      category,
      brand,
      tax,
      addnlCessUUID,
      cessUUID,
      maxStockLevel,
      reorderLevel,
      imagePath,
      branchUUID: environment.branchUUID,
      productPrices: Array.isArray(productVarient) ? productVarient : [],
      isUpdate: this.product?.isUpdate || false,
    };
  
    return productObj;
  }
  

  
  copyUnitName = (variant: ProductPrice): void => {
    const u = this.units.find((e) => e.unitUUID == variant.unitUUID);
    if (u) {
      variant.nameEnglish = u.nameEnglish;
      // variant.nameSecondLanguage = u.nameSecondLanguage;
    }
  }
  
  
deleteVarient(index: number) {
  const deletedUnit = this.productVarient[index];
  this.productVarient.splice(index, 1);
  const deletedUnitUUID = deletedUnit.unitUUID;
  this.selectedUnits = this.selectedUnits.filter(unitUUID => unitUUID !== deletedUnitUUID);
}
parentCategoryHandlerFunction(valueEmitted){
  this.categoryUUID = valueEmitted;
}

updateSelectedUnits(){
  this.selectedUnits = this.productVarient.map(variant=>variant.unitUUID)
}
  clearVariantForm(){
    this.isEdit=false
    this.createProductPricesForm()
  }

  clearVarient() {
    this.productPricesForm.patchValue({
        barcode: '',
        unitUUID: '',
        unitLevel: '',
        qtyConversion: '',
        unitCost: '',
        sellingPrice: '',
        wholeSaleRate: '',
        mrp: '',
        isBaseUnit: false
    });
    this.productPricesForm.get('qtyConversion').enable();
  }
 


  onProductSave() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.toastrService.warning(this.translationService.getValue('RESPONSE_MESSAGE.MANDATORY_FIELDS_REQUIRED'));
      return;
    }
  
    if (this.productVarient.length === 0) {
      this.toastrService.warning(this.translationService.getValue('RESPONSE_MESSAGE.PLEASE_ADD_A_VARIANT_TO_CREATE_PRODUCT'));
      return;
    }
  
    const isBaseUnit = this.productVarient.some((o) => o.isBaseUnit);
    if (!isBaseUnit) {
      this.toastrService.warning(this.translationService.getValue('RESPONSE_MESSAGE.PLEASE_CHOOSE_BASE_UNIT'));
      return;
    }
  
    const productObj = this.buildProductObj();
    if (this.isImageUpdate) {
      productObj.productImage = this.imgSrc || '';
      productObj.isImageUpdate = true;
    }
  
    const successMessage = productObj.isUpdate?this.translationService.getValue('RESPONSE_MESSAGE.PRODUCT_UPDATED_SUCCESSFULLY'):this.translationService.getValue('RESPONSE_MESSAGE.PRODUCT_ADDED_SUCCESSFULLY');

    const saveOrUpdate = (productUuid: string, product: IProduct): Observable<any> => {
      return productObj.isUpdate ? this.productService.updateProduct(productUuid, product):this.productService.saveProduct(product);
    }
    
    this.sub$.sink = saveOrUpdate(productObj.productUUID, productObj).subscribe(
      () => {
        this.toastrService.success(successMessage);
        this.onProductList();
      }
    );
    
  }
  
  onToggle(ev) {
    if(!ev.checked){
    this.productPricesForm.get('qtyConversion').enable();
    return;
    }
      this.productPricesForm.patchValue( {qtyConversion: 1});
      this.productPricesForm.get('qtyConversion').disable();

  }

  onProductList() {
    this.router.navigate(['/product'], { relativeTo: this.route });
  }


  addVarient(isClose:boolean):void{
    if(this.productPricesForm.invalid){
      this.toastrService.warning(this.translationService.getValue('RESPONSE_MESSAGE.MANDATORY_FIELDS_REQUIRED'));
      this.productPricesForm.markAllAsTouched()
      return;
    } 
    this.productPricesForm.get('qtyConversion').enable();
    const varient:ProductPrice = this.productPricesForm.value
    this.copyUnitName(varient)

    if(varient.isBaseUnit){
      this.productVarient.forEach((a)=>{
        a.isBaseUnit = false
      })
    }
    this.productVarient.push(varient);
    this.clearVariantForm()
    this.selectedUnits.push(varient.unitUUID);
    isClose?this.closeModalRef.nativeElement.click():''
  }


  editVariant(index:number):void{
    this.isEdit = true 
    const {
      productPriceUUID,
      barcode,
      unitUUID,
      unitLevel,
      qtyConversion,
      unitCost,
      sellingPrice,
      wholeSaleRate,
      mrp,
      isBaseUnit,
      isActive,
      averageCost
    } = this.productVarient[index];
    const productPricesForm = this.productPricesForm;
    productPricesForm.patchValue({
      productPriceUUID,
      barcode,
      unitUUID,
      unitLevel,
      qtyConversion,
      unitCost,
      sellingPrice,
      wholeSaleRate,
      mrp,
      isBaseUnit,
      isActive,
      averageCost
    });
    isBaseUnit?productPricesForm.get('qtyConversion').disable():productPricesForm.get('qtyConversion').enable();
  }
  updateVariant(){
    if(this.productPricesForm.invalid)return;
    this.productPricesForm.get('qtyConversion').enable();
    this.productPricesForm.get('averageCost').enable();
    const varient:ProductPrice = this.productPricesForm.value
    this.isEdit = false;
    this.copyUnitName(varient)
    if (varient.isBaseUnit) {
      this.productVarient.forEach((a) => {
        a.isBaseUnit = false;
      });
    }
    let index = this.productVarient.findIndex(
      (x) => x.productPriceUUID == varient.productPriceUUID
    );
    index < 0 ? this.addVarient(true) : (this.productVarient[index] = varient);
    this.updateSelectedUnits();
    this.clearVariantForm();
    this.closeModalRef.nativeElement.click()
  }

  updateStockValues(id:string){
    const subcategory = this.subcategories.find(x=>x.subCategoryUUID === id)
    if(!subcategory)return;

    this.productForm.patchValue({
      allowZeroPrice:subcategory.allowZeroPrice,
      allowNonStock:subcategory.allowNonStock
    })
  }
  
}
