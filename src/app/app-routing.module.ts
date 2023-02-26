import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
import { RouterModule, Routes } from '@angular/router'
import { DummyComponent } from './dummy/dummy.component';
import { HomePageComponent } from './home-page/home-page.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { LoginComponent } from './login/login.component';
import { PreventLoginGuard } from './prevent-login.guard';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    // canActivate: [IsAuthenticatedGuard]
    // canActivate: [PreventLoginGuard]
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   // canActivate: [PreventLoginGuard]
  // },
  {
    path: 'home/update/:id',
    component: UpdateComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [PreventLoginGuard]
  },
  {
    path: 'dummy',
    component: DummyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
