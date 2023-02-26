import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UserServiceService } from '../user/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private service: UserServiceService) {
    const token = localStorage.getItem('token');
    this._isLoggedIn$.next(!!token);
   }

   login(formData: any){
    return this.service.logInCustomer(formData).pipe(
      tap((res: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem('token', res.token)
      })
    )
   }
}
