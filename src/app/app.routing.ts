import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { CVComponent } from './cv/cv.component';
import {FriendsComponent} from './friends/friends.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {JobsComponent} from './jobs/jobs.component';
import {ApplicationComponent} from './application/application.component';
const routes: Routes = [
    { path: 'home',             component: LandingComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'user-profile/:uid',     component: ProfileComponent },
    {path: 'user-profile/:uid/:Contacts', component: ProfileComponent},
    { path: 'register',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'EditCV/:uid',          component: CVComponent },
    {path: 'Friends'  ,          component: FriendsComponent },
    {path: 'Stat'  ,          component: DashboardComponent },
    {path: 'Jobs'  ,          component: JobsComponent },
    {path: 'MyApplication'  ,    component: ApplicationComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
