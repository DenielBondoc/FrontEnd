import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpcClient: HttpClient) { }

  getUser(): Observable<any>{
    return this.httpcClient.get('http://localhost:8001/auth/users');
  }

  registerCustomer(formData: any){
    return this.httpcClient.post('http://localhost:8001/auth/register-user', formData);
  }

  logInCustomer(data: any): Observable<any>{
    return this.httpcClient.post('http://localhost:8001/auth/login', data);
  }

  logOutUser(data: any){
    return this.httpcClient.post('http://localhost:8001/auth/login', data)
  }
  
  
}
