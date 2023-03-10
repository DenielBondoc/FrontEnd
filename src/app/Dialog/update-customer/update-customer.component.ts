import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerUpdatedComponent } from 'src/app/DialogAlerts/customer-updated/customer-updated.component';
import { PostService } from 'src/app/services/post/post.service';
// import { PostService } from '../services/post/post.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {


  updateForm!: FormGroup;
  entries!: any;
  customers: any[] = [];
  customerKey = this.dataKey.dataKey;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataKey: any,
     private http: HttpClient,
     public service: PostService,
     private fb: FormBuilder, 
     private router: Router,
     private dialog: MatDialog
     ) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      name : [this.customerKey.name, Validators.required],
      email : [this.customerKey.email, Validators.required],
      twitter : [this.customerKey.twitter, Validators.required],
      github: [this.customerKey.github, Validators.required],
      latest_article_published: [this.customerKey.latest_article_published, Validators.required],
      location: [this.customerKey.location, Validators.required]
    })
  }

  loadCustomers(){
    this.service.getAll()
    .subscribe((customers: any) => {
      this.customers = customers;
    });
  }

  updateCustomer(){
    var id = this.customerKey.id;
    this.service.updateCustomer(id, this.updateForm.value).subscribe({
      next: (res) => {
        this.openUpdatedAlertDialog();
        this.entries = this.loadCustomers();
      },
      error: (err) => {
        alert('Error while adding customer..');
      }
    });
  }

  goBack(){
    if(window.confirm('Are you sure? Any unsaved data will be lost..')){
      this.router.navigate(['home']);
    }
  }

  openUpdatedAlertDialog() {
    const dialogRef = this.dialog.open(CustomerUpdatedComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
    
  }

}
