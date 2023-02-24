import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post/post.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {


  updateForm!: FormGroup;
  entries!: any;

  customers: any[] = [];

  constructor(private http: HttpClient, public service: PostService,private router: Router, private fb: FormBuilder, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      name : ['', Validators.required],
      email : ['', Validators.required],
      twitter : ['', Validators.required],
      github: ['', Validators.required],
      latest_article_published: ['', Validators.required],
      location: ['', Validators.required]
    })

    var id = this.actRoute.snapshot.paramMap.get('id');
    this.service.getCustomerId(id).subscribe((data) => {
      this.updateForm = this.fb.group({
        name : [data.name],
        email : [data.email],
        twitter : [data.twitter],
        github: [data.github],
        latest_article_published: [data.latest_article_published],
        location: [data.location]
      })
    })
  }


  loadCustomers(){
    this.service.getAll()
    .subscribe((customers: any) => {
      this.customers = customers;
    });
  }

  updateCustomer(){
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.service.updateCustomer(id, this.updateForm.value).subscribe({
      next: (res) => {
        alert('Customer Updated!');
        this.entries = this.loadCustomers();
      },
      error: console.log,
    })
  }
}
