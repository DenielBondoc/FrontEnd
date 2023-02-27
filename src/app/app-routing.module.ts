import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
import { RouterModule, Routes } from '@angular/router'
import { DummyComponent } from './dummy/dummy.component';
import { HomePageComponent } from './home-page/home-page.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SampleGuard } from './sample.guard';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  {
    path: 'home/update/:id',
    component: UpdateComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
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
