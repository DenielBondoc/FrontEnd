import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UserServiceService } from '../user/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private service: UserServiceService) {
   }

   isLoggedIn(){
    return localStorage.getItem('token') !== null;
   }
}
