import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpResponse, HttpClient, HttpParams } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { CustomerResourceParameter } from '@core/domain-classes/customer-resource-parameter';
import { Customer } from '@core/domain-classes/customer';
import { ChemicalList } from '@core/domain-classes/chemical-list';
import { CustomerList } from '@core/domain-classes/customer-list';
import { ICustomerAccount } from '@core/domain-classes/customer-account';
import { CustomerAccountResourceParameter } from '@core/domain-classes/customer-account-Resourceparameter';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) { }

  getCustomers(
    resourceParams: CustomerResourceParameter
  ): Observable<HttpResponse<Customer[]>> {
    const url = 'customer';
    const customParams = new HttpParams()
      .set('fields', resourceParams.fields)
      .set('orderBy', resourceParams.orderBy)
      .set('pageSize', resourceParams.pageSize.toString())
      .set('skip', resourceParams.skip.toString())
      .set('searchQuery', resourceParams.searchQuery)
      .set('customerName', resourceParams.customerName)
      .set('mobileNo', resourceParams.mobileNo)
      .set('phoneNo', resourceParams.phoneNo)
      .set('email', resourceParams.email)
      .set('contactPerson', resourceParams.contactPerson);
    return this.http.get<Customer[]>(url, {
      params: customParams,
      observe: 'response',
    });
  }


  getCustomerAccount(
    resourceParams: CustomerAccountResourceParameter
  ): Observable<HttpResponse<ICustomerAccount[]>> {
    const url = 'client';
    const customParams = new HttpParams()
      .set('fields', resourceParams.fields)
      .set('orderBy', resourceParams.orderBy)
      .set('pageSize', resourceParams.pageSize.toString())
      .set('skip', resourceParams.skip.toString())
      .set('searchQuery', resourceParams.searchQuery)
      .set('nameEnglish', resourceParams.nameEnglish)
      .set('nameSecondLanguage', resourceParams.nameSecondLanguage)
      .set('mobileNo', resourceParams.mobileNo)
      .set('email', resourceParams.email)
     
    return this.http.get<ICustomerAccount[]>(url, {
      params: customParams,
      observe: 'response',
    });
  }

  getCustomerAcccountForDropdown():Observable<ICustomerAccount[]>{
    const url = 'client';
    return this.http.get<ICustomerAccount[]>(url)

  }

  getCustomersForDropDown(searchBy: string, searchString: string): Observable<Customer[]> {
    const url = 'customer/search';
    if (searchString && searchBy) {
      let params = `?searchQuery=${searchString.trim()}&searchBy=${searchBy}&pageSize=10`;
      return this.http.get<Customer[]>(url + params);
    }
    return of([]);
  }

  getCustomer(id: string): Observable<Customer> {
    const url = 'client/' + id;
    return this.http.get<Customer>(url);
  }
  deleteCustomer(id: string): Observable<void> {
    const url = 'client/' + id;
    return this.http.delete<void>(url);
  }
  updateCustomer(id: string, customer: ICustomerAccount): Observable<ICustomerAccount> {
    const url = 'client/' + id;
    return this.http.put<ICustomerAccount>(url, customer);
  }
  saveCustomer(customer: ICustomerAccount): Observable<ICustomerAccount> {
    const url = 'Client';
    return this.http.post<ICustomerAccount>(url, customer);
  }
  checkEmailOrPhoneExist(
    email: string,
    mobileNo: string,
    id: string | Guid
  ): Observable<boolean> {
    const url = `customer/${id}/Exist?email=${email}&mobileNo=${mobileNo}`;
    return this.http.get<boolean>(url);
  }

  getChemicalsByCustomerId(id: string, skip: number, take: number, chemicalName: string, casNumber: string): Observable<ChemicalList> {
    const url = `CustomerChemical/customer/${id}?skip=${skip}&take=${take}&chemicalName=${chemicalName}&casNumber=${casNumber}`;
    return this.http.get<ChemicalList>(url);
  }
  getCustomersByChemicalId(resourceParams: CustomerResourceParameter): Observable<CustomerList> {
    const customParams = new HttpParams()
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('supplierName', resourceParams.customerName)
      .set('mobileNo', resourceParams.mobileNo)
      .set('email', resourceParams.email)
      .set('chemicalId', resourceParams.chemicalId.toString());
    const url = `CustomerChemical/chemical`;
    return this.http.get<CustomerList>(url, {
      params: customParams
    });
  }

}