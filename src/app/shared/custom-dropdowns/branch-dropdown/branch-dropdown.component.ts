import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IBranch } from '@core/domain-classes/branch';
import { Company, ICompany } from '@core/domain-classes/company';
import { IDevice } from '@core/domain-classes/device';
import { SecurityService } from '@core/security/security.service';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/base.component';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-branch-dropdown',
  templateUrl: './branch-dropdown.component.html',
  styleUrls: ['./branch-dropdown.component.scss']
})
export class BranchDropdownComponent extends BaseComponent implements OnInit, OnDestroy,OnChanges {

  @Input() group:FormGroup
  @Input() controlName:FormControl
  @Input() label?:string
  @Input() isAddAll:boolean = true
  @Input() isDefault:boolean = true
  @Input() isDisabled:boolean = true
  @Input() isMandatory:boolean = false
  @Output() branchUUID:EventEmitter<string> = new EventEmitter<string>()
  @Output() branch:EventEmitter<IBranch> = new EventEmitter<IBranch>()
  branches:IBranch[]
  all:IBranch;
  controlNameLabel:string
  companyProfile: Company;
  selectedBranchUUID:string = ''

  constructor(private branchService:BranchService,private securityService:SecurityService) {
    super();
    this.branches = [];
    this.all = {
      branchUUID: "",
      nameEnglish: "ALL",
      nameSecondLanguage: "الجميع"
    };
  }

  ngOnInit(): void {
    this.subScribeCompanyProfile()
    this.controlNameLabel = this.controlName.toString();
   this.isDefault? this.setDefaultBranch():''
   this.enableOrDisableBranchDropdown()
  }
getBranches(){
  const branch = JSON.parse(localStorage.getItem('branch') || '{}'); // Parse the branch object from localStorage
  const companyUUID = branch.companyUUID; // Get the companyUUID from branch
  if(companyUUID){
    this.sub$.sink = this.branchService.getAllBranchesForDropdown(companyUUID).subscribe((res)=>{
      this.branches =this.isAddAll?[this.all,...res]:[...res]
    },
    ()=>console.log('branch get failed'))
  }
  else{
    console.log('Company UUID not found in localStorage');
  }

}

ngOnDestroy(): void {
  this.sub$.unsubscribe();
}
ngOnChanges(changes: SimpleChanges): void {
  if (changes['controlName']) {
    this.controlNameLabel = this.controlName.toString();
  }
}

subScribeCompanyProfile(){
  this.securityService.companyProfile.subscribe((data:ICompany) => {
    this.companyProfile = new Company(data);
    this.getBranches();
  },
  ()=>console.log('company prfoile error'));
}

getBranchId(a){
  this.branchUUID.emit(a)
  const branch = this.branches.find(x=>x.branchUUID == a)
  this.branch.emit(branch)
}

setDefaultBranch():void{
  this.branchService.branchUUID$.subscribe((res:string)=>{
    this.selectedBranchUUID = res
    this.group.get(this.controlNameLabel).patchValue(this.selectedBranchUUID)
    // this.enableOrDisableBranchDropdown()
  })
}

enableOrDisableBranchDropdown():void{
  this.branchService.isHeadOffice$.subscribe((res:boolean)=>{
    res?this.group.get(this.controlNameLabel).enable():this.group.get(this.controlNameLabel).disable()
  })
}
}