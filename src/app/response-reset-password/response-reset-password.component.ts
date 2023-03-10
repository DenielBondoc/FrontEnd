import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user/user-service.service';

@Component({
  selector: 'app-response-reset-password',
  templateUrl: './response-reset-password.component.html',
  styleUrls: ['./response-reset-password.component.css']
})
export class ResponseResetPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: UserServiceService, private router: Router) { }

  formGroup!: FormGroup;


  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required],
      password_confirmation : ['', Validators.required],
      
    })

    this.route.queryParams.subscribe(params =>{
      this.form.resetToken = params['token']
    });
  }

  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  }

    submitReset(){
      this.service.changePassword(this.form).subscribe({
        next: (res: any) => {
          localStorage.removeItem('redirect');
          alert('Reset password complete.');
          this.redirectThis();   
        },
        error: (err) => {
          alert('Password reset failed');
        }
      });
    }

    redirectThis(){
      this.router.navigate(['']);
    }

  }
