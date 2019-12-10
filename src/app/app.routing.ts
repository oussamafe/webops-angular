import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import {HelpComponent} from './reclamation/help/help.component';
import {PaymentComponent} from './pack/payment/payment.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {AdminComponent} from './admin/admin.component';
import {ListReclamationComponent} from './reclamation/list-reclamation/list-reclamation.component';
import {PackCreateComponent} from './pack/pack-create/pack-create.component';
import {PackListComponent} from './pack/pack-list/pack-list.component';
import {HelpListComponent} from './reclamation/help/help-list/help-list.component';

const routes: Routes =[
    { path: 'home',             component: LandingComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'help',          component: HelpComponent },
    { path: 'pay',          component: PaymentComponent },
    {path: 'reclamation', component: ListReclamationComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'packs', component: PackCreateComponent},
    { path: 'helplist',          component: HelpListComponent },
    {path: 'packslist', component: PackListComponent},
    {
        path: 'admin',          component: AdminComponent,
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'reclamation', component: ListReclamationComponent},
            {path: '**', redirectTo: 'admin'}
        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'admin', redirectTo: 'admin'}
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
