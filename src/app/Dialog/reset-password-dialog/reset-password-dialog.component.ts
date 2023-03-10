import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.css']
})
export class ResetPasswordDialogComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: UserServiceService) { }

  redirect = 'qwerty';

  ngOnInit(): void {
    // this.formGroup = this.fb.group({
    //   email : ['', Validators.required],
    // })
  }

  public form = {
    email: null
  }

  forms!: FormGroup;

  // onSubmit(){
  //   this.service.sendPasswordResetLink(this.formGroup).subscribe(
  //     data => console.log(data),
  //     error => console.log(error)
  //   )
  // }

  onSubmit(){

    this.service.sendPasswordResetLink(this.form).subscribe({
      next: (res: any) => {
        this.handleResponse(res);
        localStorage.setItem('redirect', JSON.stringify(this.redirect));
      },
      error: (err) => {
        alert('User does not exist');
      }
    });
  }

  handleResponse(res:any){
    console.log(res);
    this.form.email = null;
  }

}
