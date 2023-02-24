import { Component, OnInit } from '@angular/core';
import { PostService } from '../post/post.service';
import { HttpClient } from '@angular/common/http';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  entries!: any;
  form!: FormGroup;

  
  constructor(private http: HttpClient, public service: PostService,private router: Router, private fb: FormBuilder, private actRoute: ActivatedRoute) { }

  customers: any[] = [];

  ngOnInit(): void {
    this.loadCustomers();

    this.form = this.fb.group({
      name : ['', Validators.required],
      email : ['', Validators.required],
      twitter : ['', Validators.required],
      github: ['', Validators.required],
      latest_article_published: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  submitCustomer() {
    var formData: any = new FormData();
    formData.append('email', this.form.get('email')?.value);
    formData.append('name', this.form.get('name')?.value);
    formData.append('twitter', this.form.get('twitter')?.value);
    formData.append('github', this.form.get('github')?.value);
    formData.append('latest_article_published', this.form.get('latest_article_published')?.value);
    formData.append('location', this.form.get('location')?.value);

    // this.http.post('http://localhost:8001/api/customers', formData)
    this.service.postCustomer(formData)
    .subscribe({
      next: (res) => {
        alert('Customer added!');
        this.entries = this.loadCustomers();
      },
      error: console.log,
    })

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
        error: console.log,
      })
      // this.router.navigate(['']);
      // this.router.navigateByUrl('/login', {skipLocationChange: true}).then(() => this.router.navigate(['']));
    }
  }
}
