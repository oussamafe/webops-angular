import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {SignupComponent} from './signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './login/login.component';
import {OnlineTestComponent} from './Interview/OnlineTestComp/OnlienTest/online-test/online-test.component';
import {OnlineTestAddComponent} from './Interview/OnlineTestComp/OnlienTest/online-test-add/online-test-add.component';
import {QuestionComponent} from './Interview/OnlineTestComp/Question/question/question.component';
import {AddQuestionComponent} from './Interview/OnlineTestComp/Question/add-question/add-question.component';
import {ResponceComponent} from './Interview/OnlineTestComp/Responce/responce/responce.component';
import {AddResponceComponent} from './Interview/OnlineTestComp/Responce/add-responce/add-responce.component';
import {ApplicationsComponent} from './Interview/CandComp/applications/applications.component';
import {ViewOnlineTestComponent} from './Interview/OnlineTestComp/OnlienTest/online-test/view-online-test/view-online-test.component';
// tslint:disable-next-line:max-line-length
import {ViewResponcesComponent} from './Interview/OnlineTestComp/OnlienTest/online-test/view-online-test/view-responces/view-responces.component';

const routes: Routes = [
    {path: 'home', component: LandingComponent},
    {path: 'user-profile', component: ProfileComponent},
    {path: 'register', component: SignupComponent},
    {path: 'landing', component: LandingComponent},
    {path: 'login', component: LoginComponent},
    {path: 'OnlineTest', component: OnlineTestComponent},
    {path: 'AddOnlineTest', component: OnlineTestAddComponent},
    {path: 'Question/:q', component: QuestionComponent},
    {path: 'Question', component: QuestionComponent},
    {path: 'ViewTest/:otid', component: ViewOnlineTestComponent},
    {path: 'ViewResp/:otid/:qid', component: ViewResponcesComponent},
    {path: 'AddQuestion', component: AddQuestionComponent},
    {path: 'Applications', component: ApplicationsComponent},
    {path: 'Responce/:idq', component: ResponceComponent},
    {path: 'AddResponce/:idq', component: AddResponceComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}
