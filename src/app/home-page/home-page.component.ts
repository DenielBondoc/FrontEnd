import { Component, OnInit } from '@angular/core';
import { PostService } from '../post/post.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  
  constructor(private http: HttpClient, public service: PostService) { }
  customers: any[] = [];

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(){
    this.service.getAll()
    .subscribe((customers: any) => {
      this.customers = customers;
    });
  }

  deleteCustomers(id: number){
    this.service.deletCustomer(id)
    .subscribe(res => {
      this.customers = this.customers.filter(item => item.id !== id);
      console.log('Person Deleted');
    })
  }
}
