import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from './home-page/home-page.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SampleGuard } from './sample.guard';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [SampleGuard]
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'home/update/:id',
    component: UpdateComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'reset_password',
    component: ResetPasswordComponent
  },
  {
    path: '**',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
