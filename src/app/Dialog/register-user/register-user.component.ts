import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  formGroup!: FormGroup;

  Users: any[] = [];

  constructor(private httpClient: HttpClient,
    private service: UserServiceService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();

    this.formGroup = this.fb.group({
      email : ['', Validators.email],
      name : ['', Validators.required],
      password : ['', Validators.required],
      password_confirmation : ['', Validators.required],
    })
  }

  regObj: any = {
    email: '',
    password: '',
    name: '',
    cpassword: '',
  };

  registerCustomer(){
    if(this.regObj.email == '' ||this.regObj.name == '' ||this.regObj.password == '' ||this.regObj.cpassword == ''){
      alert('Input fields are empty')
      return;
    }

    var formData: any = new FormData();
    formData.append('email', this.formGroup.get('email')?.value);
    formData.append('name', this.formGroup.get('name')?.value);
    formData.append('password', this.formGroup.get('password')?.value);
    formData.append('password_confirmation', this.formGroup.get('password_confirmation')?.value);

    this.service.registerCustomer(formData)
    .subscribe({
      next: (res) => {
        alert('User Registered!');
        this.router.navigate([''])
      },
      error: (err) => {
        alert('Error creating user \n Possible reasons: \n *Email already exist');
      }
    })
  }

  loadUsers(){
    this.service.getUser()
    .subscribe((users: any) => {
      this.Users = users;
    });
  }

  goBack(){
    this.dialog.closeAll();
  }
}
