import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import {TokenInterceptor} from './services/TokenInterceptor';
import { OnlineTestComponent } from './Interview/OnlineTestComp/OnlienTest/online-test/online-test.component';
import { OnlineTestAddComponent } from './Interview/OnlineTestComp/OnlienTest/online-test-add/online-test-add.component';
import { ListQComponent } from './Interview/OnlineTestComp/OnlienTest/online-test/list-q/list-q.component';
import { QuestionComponent } from './Interview/OnlineTestComp/Question/question/question.component';
import { AddQuestionComponent } from './Interview/OnlineTestComp/Question/add-question/add-question.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ResponceComponent } from './Interview/OnlineTestComp/Responce/responce/responce.component';
import { AddResponceComponent } from './Interview/OnlineTestComp/Responce/add-responce/add-responce.component';
import { ResIsvalidComponent } from './Interview/OnlineTestComp/Responce/Responce/res-isvalid/res-isvalid.component';
import { ApplicationsComponent } from './Interview/CandComp/applications/applications.component';
// tslint:disable-next-line:max-line-length
import { CandidateOfferInformationComponent } from './Interview/CandComp/Applications/candidate-offer-information/candidate-offer-information.component';
import { ViewOnlineTestComponent } from './Interview/OnlineTestComp/OnlienTest/online-test/view-online-test/view-online-test.component';
// tslint:disable-next-line:max-line-length
import { ViewResponcesComponent } from './Interview/OnlineTestComp/OnlienTest/online-test/view-online-test/view-responces/view-responces.component';
// tslint:disable-next-line:max-line-length
import { ViewRespIsvalComponent } from './Interview/OnlineTestComp/OnlienTest/online-test/view-online-test/view-responces/view-resp-isval/view-resp-isval.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    OnlineTestComponent,
    OnlineTestAddComponent,
    ListQComponent,
    QuestionComponent,
    AddQuestionComponent,
    ResponceComponent,
    AddResponceComponent,
    ResIsvalidComponent,
    ApplicationsComponent,
    CandidateOfferInformationComponent,
    ViewOnlineTestComponent,
    ViewResponcesComponent,
    ViewRespIsvalComponent,
  ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        FormsModule,
        RouterModule,
        AppRoutingModule,
        HomeModule,
        HttpClientModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    HttpClient,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
