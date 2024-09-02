import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '@core/domain-classes/employee';
import { EmployeeResourceParameter } from '@core/domain-classes/employee-resourceparameter';
import { Supplier } from '@core/domain-classes/supplier';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(resourceParams: EmployeeResourceParameter): Observable<HttpResponse<Employee[]>> {
    const url = "employee";
    const customParams = new HttpParams()
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('nameEnglish', resourceParams.nameEnglish)
      .set('nameSecondLanguage', resourceParams.nameSecondLanguage)
      .set('mobileNo', resourceParams.mobile)
      .set('email', resourceParams.email);
    return this.http.get<Employee[]>(url,
      {
        params: customParams,
        observe: 'response'
      });
  }

  getEmployee(id: string): Observable<Employee> {
    const url = `employee/${id}`;
    return this.http.get<Employee>(url);
  }
  
    // getSalesMan(): Observable<Employee[]> {
    //   const url = `employee/SalesMan`;
    //   return this.http.get<Employee[]>(url);
    // }
  getSalesMan(): Observable<Employee[]> {
    const url = `employee/SalesMan`;
    return this.http.get<Employee[]>(url);
  }
  saveEmployee(employee: Employee): Observable<Employee> {
    const url = 'employee';
    return this.http.post<Employee>(url, employee);
  }

  updateEmployee(id: string, employee: Employee): Observable<Employee> {
    const url = `employee/${id}`;
    return this.http.put<Employee>(url, employee);
  }

  deleteEmployee(id: string): Observable<void> {
    const url = `employee/${id}`;
    return this.http.delete<void>(url);
  }

}
