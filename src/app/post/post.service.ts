import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Customers } from '../models/customers'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get('http://localhost:8001/api/customers');
  }

  deletCustomer(id: number){
    return this.httpClient.delete('http://localhost:8001/api/customers'+ '/' + id)
  }
}
