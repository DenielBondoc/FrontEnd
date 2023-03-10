import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UserServiceService } from '../services/user/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private service: UserServiceService) {
   }

   isLoggedIn(){
    return localStorage.getItem('token') !== null;
   }

   isRedirect(){
    return localStorage.getItem('redirect') !== null;
   }
}
