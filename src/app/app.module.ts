import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { PostService } from 'src/app/services/post/post.service';
import { UpdateComponent } from './update/update.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AddCustomerComponent } from './Dialog/add-customer/add-customer.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RegisterUserComponent } from './Dialog/register-user/register-user.component';
import { UpdateCustomerComponent } from './Dialog/update-customer/update-customer.component';
import { ResponseResetPasswordComponent } from './response-reset-password/response-reset-password.component';
import { ResetPasswordDialogComponent } from './Dialog/reset-password-dialog/reset-password-dialog.component';
import { DeleteAlertComponent } from './DialogAlerts/delete-alert/delete-alert.component';
import { CustomerAddedComponent } from './DialogAlerts/customer-added/customer-added.component';
import { CustomerUpdatedComponent } from './DialogAlerts/customer-updated/customer-updated.component';
import { ChildOneComponent } from './ChildComponnets/child-one/child-one.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    UpdateComponent,
    AddCustomerComponent,
    RegisterUserComponent,
    UpdateCustomerComponent,
    ResponseResetPasswordComponent,
    ResetPasswordDialogComponent,
    DeleteAlertComponent,
    CustomerAddedComponent,
    CustomerUpdatedComponent,
    ChildOneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    RouterModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
