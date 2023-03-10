import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddCustomerComponent } from '../Dialog/add-customer/add-customer.component';
import { RegisterUserComponent } from '../Dialog/register-user/register-user.component';
import { ResetPasswordDialogComponent } from '../Dialog/reset-password-dialog/reset-password-dialog.component';
import { UserServiceService } from '../services/user/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;


  constructor(private httpClient: HttpClient, private service: UserServiceService, private fb: FormBuilder, private router: Router, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required],
    })
  }
  
    loginObj: any = {
      email: '',
      password: ''
    };
  
    loginUser(){

      if(this.loginObj.email == '' || this.loginObj.password == ''){
        alert('Input fields are empty')
        return;
      }

      this.service.logInCustomer(this.loginObj).subscribe({
        next: (res: any) => {
          localStorage.setItem('token',JSON.stringify(res.token.original.token));
          this.router.navigate(['home']);
        },
        error: (err) => {
          alert('User does not exist');
        }
      });
    }

    redirect(){
      this.router.navigate(['home']);
    }

    redirectToRegister(){
      this.router.navigate(['register']);
    }

    openRegisterUserDialog() {
      const dialogRef = this.dialog.open(RegisterUserComponent, {
        width: '450px',
        backdropClass: 'backDropBackground'
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        console.log(`Dialog result: ${result}`);
      });
    }

    openResetPasswordDialog() {
      const dialogRef = this.dialog.open(ResetPasswordDialogComponent, {
        width: '450px',
        backdropClass: 'backDropBackground'
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        console.log(`Dialog result: ${result}`);
      });
    }
}
