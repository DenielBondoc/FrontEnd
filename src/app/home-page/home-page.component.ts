import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from '../Dialog/add-customer/add-customer.component';
import { PostService } from '../services/post/post.service';
import { UserServiceService } from '../services/user/user-service.service';
import { Customers } from '../models/customers';
import { UpdateCustomerComponent } from '../Dialog/update-customer/update-customer.component';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteAlertComponent } from '../DialogAlerts/delete-alert/delete-alert.component';

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
  customers: any[] = [];

  
  constructor(private http: HttpClient,
    public service: PostService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserServiceService,
    public dialog: MatDialog
    ) { }


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

  displayedColumns: string[] = ['id', 'name', 'email', 'twitter', 'github', 'latest_article_published', 'location', 'edit', 'delete'];
  dataSource!: MatTableDataSource<any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  loadCustomers(){
    this.service.getAll()
    .subscribe((customers: any) => {
      this.dataSource = new MatTableDataSource(customers);
    });
  }

  deletCustomer(id: number) {
    if(window.confirm('Are you sure you want to delete this customer?')){
      this.service.deletCustomer(id).subscribe({
        next: (res) => {
          this.openDeleteAlertDialog();
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

  reload(){
    this.entries = this.loadCustomers();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      width: '400px',
      backdropClass: 'backDropBackground'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
      this.reload();
    });
  }

  openUpdateDialog(dataKey: Customers) {
    const dialogRef = this.dialog.open(UpdateCustomerComponent, {
      width: '400px',
      backdropClass: 'backDropBackground',
      data: {
        dataKey: dataKey
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
      this.reload();
    });
    
  }

  openDeleteAlertDialog() {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
      this.reload();
    });
    
  }


















}