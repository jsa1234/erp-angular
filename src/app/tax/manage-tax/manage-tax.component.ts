import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountHeadTree } from '@core/domain-classes/account-head-tree';
import { TaxBehaviour } from '@core/domain-classes/enums/tax-behaviour.enum';
import { TaxTypes } from '@core/domain-classes/enums/tax-types.enum';
import { Tax } from '@core/domain-classes/tax';
import { SecurityService } from '@core/security/security.service';
import { TaxService } from '@core/services/tax.service';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { AccountHeadService } from 'src/app/accounts/accounts/account-head.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-manage-tax',
  templateUrl: './manage-tax.component.html',
  styleUrls: ['./manage-tax.component.scss']
})
export class ManageTaxComponent extends BaseComponent implements OnInit {
  isEdit: boolean = false;
  taxForm: FormGroup;
  isDisable: boolean=false;
  acccountHeadList: AccountHeadTree[];
  taxTypes:TaxTypes[]
  taxTypeEnum = TaxTypes
  taxBehaviours: TaxBehaviour[];
  isLoading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ManageTaxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tax,
    private taxService: TaxService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    public translationService: TranslationService,
    private accountheadService:AccountHeadService,
    private securtyService:SecurityService) {
    super();
    
  }

  ngOnInit(): void {
    this.getAllTaxTypes()
    this.getAllTaxBehaviour()
    this.createForm();
    this.getAllLevelThreeAccountHeads()
    if (this.data.taxUUID) {
      this.taxForm.patchValue(this.data);
      this.isEdit = true;
    }
  }

  createForm() {
    this.taxForm = this.fb.group({
      taxUUID: [''],
      taxId: [''],
      nameEnglish: ['', Validators.required], 
      // nameSecondLanguage: [''], 
      code: [''], 
      percentage: [''],
      branchUUID:[this.securtyService.getUserDetail().branchUUID],
      isActive:[true],
      cgst:['',[Validators.required,Validators.max(100),Validators.min(0),]],
      sgst:['',[Validators.required,Validators.max(100),Validators.min(0),]],
      igst:['',[Validators.required,Validators.max(100),Validators.min(0),]],
      taxType:[this.taxTypeEnum.TAX],
      taxBehaviour:[''],
      saleMappingAccountUUID:[''],
      purchaseMappingAccountUUID:[''],
      taxValidFrom:[''],
      taxValidTo:[''],
      isGlobal:[false]
    });

    this.taxForm.get('taxType').valueChanges.subscribe((taxType) => {
      this.updateValidators(taxType);
    });
  }
  get isActive():boolean {return this.taxForm.get('isActive').value}
  get taxType():TaxTypes {return this.taxForm.get('taxType').value}
  get isGlobal():boolean {return this.taxForm.get('isGlobal').value}


  onCancel(): void {
    this.dialogRef.close();
  }

  saveTax(): void {
    if (this.taxForm.invalid) {
      this.taxForm.markAllAsTouched();
      return;
    }
    const sgst = this.taxForm.get('sgst')?.value;
    const cgst = this.taxForm.get('cgst')?.value;
    const igst = this.taxForm.get('igst')?.value;
    
    if (sgst !== cgst) {
      this.toastrService.warning('SGST must be equal to CGST.');
      return;
    }
    if(igst !== sgst + cgst){
      this.toastrService.warning('IGST must be the sum of SGST and CGST');
      return
    }
    this.isDisable = true
    const tax: Tax = this.taxForm.getRawValue();
    tax.branchUUID = tax.branchUUID
    tax.taxType === this.taxTypeEnum.TAX ? (tax.percentage = 0) : (tax.sgst = tax.cgst = tax.igst = 0);
    this.isLoading=true;
    if (this.data.taxUUID) {
      this.taxService.update(tax).subscribe(() => {
        this.isLoading=false;
        this.toastrService.success('Tax Updated Successfully.');
        this.onCancel()
      },(err)=>{    this.isDisable = false});
    } else {
     
      this.taxService.add(tax).subscribe(() => {
        this.isLoading=false;
        this.toastrService.success('Tax Added Successfully.');
        this.onCancel()
      },(err)=>{    this.isDisable = false});
    }
  }
  getAllLevelThreeAccountHeads() {
    this.accountheadService.getAllLevelThreeAccountHeads().subscribe((res: AccountHeadTree[]) => {
        this.acccountHeadList = res;
      });
  }


  getAllTaxTypes():void{
    this.taxService.loadTaxTypes().subscribe((res)=>{
      this.taxTypes = res
    })
  }
  getAllTaxBehaviour():void{
    this.taxService.loadTaxBehaviour().subscribe((res)=>{
      this.taxBehaviours = res
    })
  }



  updateValidators(taxType: TaxTypes) {
    const sgstControl = this.taxForm.get('sgst');
    const cgstControl = this.taxForm.get('cgst');
    const igstControl = this.taxForm.get('igst');
    const percentageControl = this.taxForm.get('percentage');

    if (taxType === this.taxTypeEnum.TAX) {
      sgstControl.setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
      cgstControl.setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
      igstControl.setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
      percentageControl.clearValidators();
    } else {
       sgstControl.clearValidators();
      cgstControl.clearValidators();
      igstControl.clearValidators();
      percentageControl.setValidators([Validators.required]);
    }

    sgstControl.updateValueAndValidity();
    cgstControl.updateValueAndValidity();
    igstControl.updateValueAndValidity();
    percentageControl.updateValueAndValidity();
  }
}

