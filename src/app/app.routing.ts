import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
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
import {StepTwoTestComponent} from './Interview/OnlineTestComp/OnlienTest/step-two-test/step-two-test.component';
import {ExamenForCandidateComponent} from './Interview/OnlineTestComp/OnlienTest/examen-for-candidate/examen-for-candidate.component';
import {ResultExamenComponent} from './Interview/OnlineTestComp/OnlienTest/result-examen/result-examen.component';
import {AvabilityUserComponent} from './Interview/InterviewComp/Avaibility/avability-user/avability-user.component';
import {InterviewTypeComponent} from './Interview/InterviewComp/InterviewType/interview-type/interview-type.component';
import {InterviewComponent} from './Interview/InterviewComp/Interview/interview/interview.component';
import {StatTestComponent} from './Interview/StatisticComp/TestStat/stat-test/stat-test.component';
import {StatInterviewComponent} from './Interview/StatisticComp/InterStat/stat-interview/stat-interview.component';
import {VedioCallComponent} from './Interview/InterviewComp/Interview/vedio-call/vedio-call.component';

const routes: Routes = [
    {path: 'home', component: LandingComponent},
    {path: 'user-profile', component: ProfileComponent},
    {path: 'register', component: SignupComponent},
    {path: 'landing', component: LandingComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LoginComponent},
    {path: 'OnlineTest', component: OnlineTestComponent},
    {path: 'AddOnlineTest', component: OnlineTestAddComponent},
    {path: 'Question/:q/:otid', component: QuestionComponent},
    {path: 'Question/:q', component: QuestionComponent},
    {path: 'Question', component: QuestionComponent},
    {path: 'ViewTest/:otid', component: ViewOnlineTestComponent},
    {path: 'ViewResp/:otid/:qid', component: ViewResponcesComponent},
    {path: 'StepTwoTest/:cid/:otid', component: StepTwoTestComponent},
    {path: 'AddQuestion', component: AddQuestionComponent},
    {path: 'AddQuestion/:cid/:otid', component: AddQuestionComponent},
    {path: 'Applications', component: ApplicationsComponent},
    {path: 'Responce/:idq', component: ResponceComponent},
    {path: 'Responce/:idq/:otid', component: ResponceComponent},
    {path: 'Responce/:idq/:r', component: ResponceComponent},
    {path: 'Responce/:idq/:r/:otid', component: ResponceComponent},
    {path: 'AddResponce/:idq', component: AddResponceComponent},
    {path: 'AddResponce/:cid/:otid/:qid', component: AddResponceComponent},
    {path: 'CandidateExamen/:cid', component: ExamenForCandidateComponent},
    {path: 'ResultExamen/:cid', component: ResultExamenComponent},
    {path: 'AvaibilityUser/:uid', component: AvabilityUserComponent},
    {path: 'InterviewType', component: InterviewTypeComponent},
    {path: 'Interview', component: InterviewComponent},
    {path: 'Interview/:uid', component: InterviewComponent},
    {path: 'statTest', component: StatTestComponent},
    {path: 'statinter', component: StatInterviewComponent},
    {path: 'vediocall/:iid', component: VedioCallComponent},
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
