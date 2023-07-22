import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import {  TestCanActivate } from './auth-guard.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: 'signUp', component: SignUpComponent},
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'employeeDetails', component: EmployeeDetailsComponent ,canActivate:[TestCanActivate] },
  { path: 'homePage', component: HomePageComponent,canActivate:[TestCanActivate]},
  { path: 'contactPage', component: ContactPageComponent,canActivate:[TestCanActivate] },
  { path: 'aboutPage', component: AboutPageComponent,canActivate:[TestCanActivate] },
  {path:'resetPassword',component:ResetPasswordComponent ,canActivate:[TestCanActivate]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

