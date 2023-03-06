import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    public service: PostService) { }

  ngOnInit(): void {

    this.loadCustomers();

    this.form = this.fb.group({
      name : ['',Validators.required],
      email : ['',Validators.required],
      twitter : ['',Validators.required],
      github: ['',Validators.required],
      latest_article_published: ['',Validators.required],
      location: ['',Validators.required]
    })
  }


  form!: FormGroup;
  entries!: any;
  customers: any[] = [];

  formObj: any = {
    name : '',
    email : '',
    twitter : '',
    github: '',
    latest_article_published: '',
    location: ''
  };


  submitCustomer() {

    var formData: any = new FormData();
    formData.append('email', this.form.get('email')?.value);
    formData.append('name', this.form.get('name')?.value);
    formData.append('twitter', this.form.get('twitter')?.value);
    formData.append('github', this.form.get('github')?.value);
    formData.append('latest_article_published', this.form.get('latest_article_published')?.value);
    formData.append('location', this.form.get('location')?.value);

    this.http.post('http://localhost:8001/api/customers', formData)
    this.service.postCustomer(formData)
    .subscribe({
      next: (res) => {
        alert('Customer added!');
        this.resetThisForm();
        this.entries = this.loadCustomers();
      },
      error: (err) => {
        alert('Error while adding customer..');
      }
    })
  }

  resetThisForm(){
    this.formObj.email = '';
    this.formObj.name = '';
    this.formObj.twitter = '';
    this.formObj.github = '';
    this.formObj.latest_article_published = '';
    this.formObj.location = '';
  }

  loadCustomers(){
    this.service.getAll()
    .subscribe((customers: any) => {
      this.customers = customers;
    });
  }

}
