import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyProfileService {

  constructor(private http:HttpClient) { }

  getCompanyProfile(){
    const url = 'CompanyProfile'
    return this.http.get(url)
  }

}
