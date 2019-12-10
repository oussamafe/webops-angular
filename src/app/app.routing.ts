import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { JobComponent } from './company-profile/job/job.component';
import { EventComponent } from './company-profile/event/event.component';
import { JobsComponent } from './jobs/jobs.component';
import { SearchComponent } from './search/search.component';

const routes: Routes =[
    { path: 'home',             component: LandingComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'company',          component: CompanyProfileComponent },
    { path: 'job',          component: JobComponent },
    { path: 'event',          component: EventComponent },
    { path: 'jobs',          component: JobsComponent },
    { path: 'search',          component: SearchComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
