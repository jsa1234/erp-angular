import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { ISupplierAccount } from '@core/domain-classes/supplierAccount';
import { BaseComponent } from 'src/app/base.component';
import { SupplierService } from 'src/app/supplier/supplier.service';

@Component({
  selector: 'app-supplier-dropdown',
  templateUrl: './supplier-dropdown.component.html',
  styleUrls: ['./supplier-dropdown.component.scss']
})
export class SupplierDropdownComponent extends BaseComponent implements OnInit {
@Input() group:FormGroup
@Input() controlName:FormControl
suppliers:ISupplierAccount[]
@Input() isMandatory:boolean = false
@Output() supplierSelected = new EventEmitter<ISupplierAccount>();
  constructor(private supplierService:SupplierService)
   { super() }

  ngOnInit(): void {
    this.getSuppliers()
  }
  getSuppliers(){
    this.sub$.sink = this.supplierService.getSupplierAcccountForDropdown().subscribe((res:ISupplierAccount[])=>{
      this.suppliers = res
    })
  }

  onSelectSupplier(supplierUUID:string){
    const supplier = this.suppliers.find(el=>el.accountUUID == supplierUUID)
    this.supplierSelected.emit(supplier)
  }
}
