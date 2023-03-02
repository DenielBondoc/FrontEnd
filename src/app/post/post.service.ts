import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import {  Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Customers } from '../models/customers'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getCustomerId(id: any): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8001/api/customers/${id}`);
  }

  getAll(){
    return this.httpClient.get('http://localhost:8001/api/customers');
  }

  postCustomer(formData: any){    
    return this.httpClient.post('http://localhost:8001/api/customers', formData);
  }

  deletCustomer(id: number): Observable<any>{
    const requestOption: Object = { responseType: 'text'}
    return this.httpClient.delete<any>(`http://localhost:8001/api/customers/${id}`, requestOption);
  }


  updateCustomer(id: any, data: any): Observable<any>{
    const requestOption: Object = { responseType: 'text'}
    return this.httpClient.put(`http://localhost:8001/api/customers/${id}`, JSON.stringify(data), this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl));
  }

  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
