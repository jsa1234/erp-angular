import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBarcodeProfileConfigurations, IVariantBarcodeImages, IConfiguration } from '@core/domain-classes/barcode-profile-configurations.interface';
import { IBarcodeProfile } from '@core/domain-classes/barcode-profile.interface';
import { ProductPrice } from '@core/domain-classes/product';
import { PurchaseInvoiceDetail } from '@core/domain-classes/purchase-order/purchase-invoice-details';
import { ClonerService } from '@core/services/clone.service';
import { GenerateBarcode, GeneratePurchaseBarcode, UpdateBarcodeConfigurations } from '@shared/helpers/barcode-generator.helper';
import { BaseComponent } from 'src/app/base.component';
import { ProductService } from 'src/app/product/product.service';
import { PurchaseService } from '../purchase.service';
import { IPurchaseInvoice } from '@core/domain-classes/purchase-order/purchase-invoice';
import { BranchService } from 'src/app/branch/branch.service';
import { IBranch } from '@core/domain-classes/branch';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-purchase-barcode',
  templateUrl: './purchase-barcode.component.html',
  styleUrls: ['./purchase-barcode.component.scss']
})
export class PurchaseBarcodeComponent extends BaseComponent implements OnInit {

  productVariants: PurchaseInvoiceDetail[] = [];
  barcodeProfiles: IBarcodeProfile[] = [];
  barcodeProfileConfigurations: IBarcodeProfileConfigurations[] = [];
  selectedPurchasedProductVariant: PurchaseInvoiceDetail;
  selectedProductVariant:ProductPrice
  quantity:number;
  isShowConfiguration = false;
  selectedProfile: IBarcodeProfile;
  selectedProfileConfiguration: IBarcodeProfileConfigurations;
  variantBarcodeImages: IVariantBarcodeImages = {};
  variantBarcodeImagesPdf: IVariantBarcodeImages = {};
  productVariantsPdf: PurchaseInvoiceDetail[] = [];
  productName: string;
  productCode: string;
  stickerPerLine: number = null;
  productPrice: ProductPrice[];
  mfgDate: Date;
  expDate: Date;
  variantName: string;
  variantUUID: string;
  barcodeProductPrice: ProductPrice;
  branch: IBranch;
  loading$:Observable<boolean> = of(false)
  constructor(
    private route: ActivatedRoute, 
    private clonerService: ClonerService,
    private productService:ProductService,
    private purchaseService:PurchaseService,
    private branchService:BranchService) {
    super();
  }

  ngOnInit() {
    this.fetchBarcodeAndVariants();
  }

  fetchBarcodeAndVariants(): void {
    this.sub$.sink = this.route.data.subscribe((data: {
      barcode: {
        barcodeProfiles: IBarcodeProfile[];
        productVariants: PurchaseInvoiceDetail[];
        barcodeProfileConfigurations: IBarcodeProfileConfigurations[];
      };
    }) => {
      const { barcode } = data;
      this.barcodeProfiles = barcode.barcodeProfiles || [];
      this.productVariants = barcode.productVariants || [];
      this.barcodeProfileConfigurations = barcode.barcodeProfileConfigurations || [];
    });
  }

  getSingleProfileConfiguration(): void {
    this.productName = this.selectedPurchasedProductVariant.productObject.nameEnglish;
    this.productCode = this.selectedPurchasedProductVariant.productObject.productCode;
    if (!this.selectedProfile || !this.selectedPurchasedProductVariant) {
      console.log('Please choose both profile and variant');
      return;
    }

    this.isShowConfiguration = true;
    this.variantBarcodeImages = {};
    this.selectedProfileConfiguration = this.clonerService.deepClone<IBarcodeProfileConfigurations>(
      this.barcodeProfileConfigurations.find((p) => p.profileId === this.selectedProfile.barcodeProfileEnum)
    );
    this.variantBarcodeImages = GeneratePurchaseBarcode(
      this.selectedProfile,
      this.selectedProfileConfiguration,
      this.barcodeProductPrice,
      this.variantName,
      this.variantUUID,
      this.expDate,
      this.mfgDate,
      this.selectedProfile.stickerPerLine,
      this.productName,
      this.branch
    );
  }

  updateConfigurationValue(config: IConfiguration): void {
    if (this.selectedProfileConfiguration) {
      const configIndex = this.selectedProfileConfiguration.configurations.findIndex((c) => c.label === config.label);

      if (configIndex !== -1) {
        const updatedProfileConfiguration = this.clonerService.deepClone<IBarcodeProfileConfigurations>(
          this.selectedProfileConfiguration
        );
        updatedProfileConfiguration.configurations[configIndex].value = config.value;
        this.selectedProfileConfiguration = updatedProfileConfiguration;
      }
    }
  }

  isConfigEnabled(label: string): boolean {
    if (this.selectedProfileConfiguration) {
      const config = this.selectedProfileConfiguration.configurations.find(
        (c) => c.key.toLowerCase() === label.toLowerCase()
      );
      return config ? config.value : false;
    }
    return false;
  }

  generateBarcode(): void {
    this.loading$ = of(true)
    this.stickerPerLine = this.selectedProfile.stickerPerLine
    const generatedBarcodeImage: IVariantBarcodeImages = GeneratePurchaseBarcode(
      this.selectedProfile,
      this.selectedProfileConfiguration,
      this.barcodeProductPrice,
      this.variantName,
      this.variantUUID,
      this.expDate,
      this.mfgDate,
      this.quantity,
      this.productName,
      this.branch
    );

    if (!this.variantBarcodeImagesPdf) {
      this.variantBarcodeImagesPdf = {};
    }
    const selectedVariant = this.selectedPurchasedProductVariant?.productPriceUUID;

    if (selectedVariant) {
      if (!this.variantBarcodeImagesPdf[selectedVariant]) {
        this.variantBarcodeImagesPdf[selectedVariant] = generatedBarcodeImage[selectedVariant];
      } else {
        this.variantBarcodeImagesPdf[selectedVariant].images.push(...generatedBarcodeImage[selectedVariant].images);

        const existingConfigurations = this.variantBarcodeImagesPdf[selectedVariant].configuration.configurations;
        const newConfigurations = generatedBarcodeImage[selectedVariant].configuration.configurations;
        const updatedConfigurations = UpdateBarcodeConfigurations(existingConfigurations, newConfigurations);
        this.variantBarcodeImagesPdf[selectedVariant].configuration.configurations = updatedConfigurations;
      }
    }
    this.productVariantsPdf = this.clonerService.deepClone<PurchaseInvoiceDetail[]>(this.productVariants);
    this.selectedPurchasedProductVariant = null;
    this.quantity = null;
    this.isShowConfiguration = false;
    this.branch = null ;
    this.productPrice = null,
    this.selectedProductVariant = null
    this.selectedProfile = null;
    this.productName = '';
    this.productCode = '';
    this.loading$ = of(false)

  }

  clear(): void {
    for (const variantName of Object.keys(this.variantBarcodeImagesPdf)) {
      this.variantBarcodeImagesPdf[variantName].images = [];
    }
    this.productVariantsPdf = [];
    this.variantBarcodeImagesPdf = {};
  }

  deleteBarcodeImage(variantName: string, rowIndex: number, columnIndex: number): void {
    if (this.variantBarcodeImagesPdf[variantName]) {
      const images = this.variantBarcodeImagesPdf[variantName].images;
      if (images && images[rowIndex] && images[rowIndex][columnIndex]) {
        images[rowIndex].splice(columnIndex, 1);

        if (images.every((row) => row.length === 0)) {
          delete this.variantBarcodeImagesPdf[variantName];
        }
      }
    }
  }



  getProductVariants():void{
    this.loading$ = of(true);
    this.sub$.sink = this.productService.getProductVarients(this.selectedPurchasedProductVariant.productUUID).subscribe((res:ProductPrice[])=>{
      this.productPrice = res;
    })

    this.sub$.sink = this.purchaseService.getPurchaseInvoiceById(this.selectedPurchasedProductVariant.purchaseInvoiceUUID).subscribe((res:IPurchaseInvoice)=>{
      this.sub$.sink = this.branchService.getSingleBranch(res.branchUUID).subscribe((branch:IBranch)=>{
        this.branch = branch
    this.loading$ = of(false);

      })
    })
  }
  
  compareVariants():void{
    if(this.selectedPurchasedProductVariant.productPriceUUID === this.selectedProductVariant.productPriceUUID){
      this.mfgDate = this.selectedPurchasedProductVariant.manufactureDate;
      this.expDate = this.selectedPurchasedProductVariant.expiryDate;
      this.quantity = this.selectedPurchasedProductVariant.quantity;
      this.variantName = this.selectedPurchasedProductVariant.unitObject.nameEnglish;
      this.variantUUID = this.selectedPurchasedProductVariant.productPriceUUID;
      this.barcodeProductPrice =  JSON.parse(this.selectedPurchasedProductVariant.productPrice) || null;
    }
    else{
      this.mfgDate = this.selectedPurchasedProductVariant.manufactureDate;
      this.expDate = this.selectedPurchasedProductVariant.expiryDate;
      this.quantity = null;
      this.variantName = this.selectedProductVariant.nameEnglish;
      this.variantUUID = this.selectedProductVariant.productPriceUUID;
      this.barcodeProductPrice = this.selectedProductVariant

    }
  }




  isVariantBarcodeImagesPdfEmpty(): boolean {
    return Object.keys(this.variantBarcodeImagesPdf).length === 0;
  }

  printBarcode(): void {
    setTimeout(() => {
      const name = 'Barcode Images';
      let printContents, popupWin;
      printContents = document.getElementById('barcode').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
        <html>
          <head>
            <title>${name}</title>
            <style>
              body {
                margin:0 !important;
              }
            </style>
            <script>
              function loadHandler() {
                var isChrome = function () {
                  return Boolean(window.chrome);
                };
                if (isChrome) {
                  window.print();
                  setTimeout(function () {
                    window.close();
                  }, 1000);
                } else {
                  window.print();
                  window.close();
                }
              }
            </script>
          </head>
          <body onload="loadHandler()">
          <style>
          @font-face {
            font-family: roboto;
            src: url(../../../assets/fonts/Roboto-Medium.ttf);
          }
          </style>
          ${printContents}
          </body>
        </html>
      `);
      popupWin.document.close();
    }, 1000);
  }

}
