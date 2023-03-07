import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user/user-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  formGroup!: FormGroup

  loginObj: any = {
    email: '',
  };

  constructor(private fb: FormBuilder, private service: UserServiceService) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required],
    })
  }

  // onSubmit(){
  //   this.service.sendPasswordResetLink(this.formGroup).subscribe(
  //     data => console.log(data),
  //     error => console.log(error)
  //   )
  // }

  onSubmit(){

    // if(this.loginObj.email == '' || this.loginObj.password == ''){
    //   alert('Input fields are empty')
    //   return;
    // }

    this.service.sendPasswordResetLink(this.loginObj).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => {
        alert('User does not exist');
      }
    });
  }

}
