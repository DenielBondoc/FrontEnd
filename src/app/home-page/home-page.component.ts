import { Component, OnInit } from '@angular/core';
import { PostService } from '../post/post.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../user/user-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  entries!: any;
  form!: FormGroup;
  data!: any;
  userMe: any=[];

  formObj: any = {
    name : '',
    email : '',
    twitter : '',
    github: '',
    latest_article_published: '',
    location: ''
  };
  
  constructor(private http: HttpClient,
    public service: PostService,
    private router: Router,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private userService: UserServiceService
    ) { }

  customers: any[] = [];

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

    this.userService.me().subscribe((data: any) =>{
      this.userMe = data;
    })
  }

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
  
  deletCustomer(id: number) {
    if(window.confirm('Are you sure you want to delete this customer?')){
      this.service.deletCustomer(id).subscribe({
        next: (res) => {
          alert('Customer deleted!');
          this.entries = this.loadCustomers();
        },
        error: (err) => {
          alert('Customer deletion error');
        }
      });
    }
  }

  logOut(){
    if(window.confirm('Are you sure you want to log out?')){
      this.userService.logOut();
      localStorage.removeItem('token');
      localStorage.removeItem('me');
      this.router.navigate(['']);
    }
  }
}
