import { Component, OnInit,Input } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import {FormGroup,FormControl} from '@angular/forms'
import { CustomerService } from 'src/app/customer/customer.service';
import { ICustomerAccount } from '@core/domain-classes/customer-account';

@Component({
  selector: 'app-customer-dropdown',
  templateUrl: './customer-dropdown.component.html',
  styleUrls: ['./customer-dropdown.component.scss']
})
export class CustomerDropdownComponent extends BaseComponent implements OnInit {
  @Input() group:FormGroup
  @Input() controlName:FormControl
  customers:ICustomerAccount[]
  @Input() isMandatory:boolean = false
  constructor(private customerService:CustomerService) { 
    super()
  }

  ngOnInit(): void {
    this.getCustomers()
  }
  getCustomers(){
    this.sub$.sink = this.customerService.getCustomerAcccountForDropdown().subscribe((res:ICustomerAccount[])=>{
      this.customers = res
    })
  }

}
