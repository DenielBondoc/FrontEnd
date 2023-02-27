import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../user/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;


  constructor(private httpClient: HttpClient, private service: UserServiceService, private fb: FormBuilder, private router: Router) { }
  
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email : ['', Validators.email],
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
        next: (res) => {
          localStorage.setItem('token',JSON.stringify(res.token));
          this.redirect();
        },
        error: console.log,
      })
    }

    redirect(){
      this.router.navigate(['home']);
    }

    redirectToRegister(){
      this.router.navigate(['register']);

    }
}
