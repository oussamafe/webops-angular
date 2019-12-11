import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { MatDialogModule,MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatButtonModule, MatProgressSpinnerModule} from '@angular/material';
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
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { SkillsComponent } from './skills/skills.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { JobComponent } from './company-profile/job/job.component';
import { EventComponent } from './company-profile/event/event.component';
import { EmployeeComponent } from './company-profile/employee/employee.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditEventComponent } from './company-profile/job/edit-event/edit-event.component';
import { DatePipe } from '@angular/common';
import { EditJobComponent } from './company-profile/job/edit-job/edit-job.component';
import { JobsComponent } from './jobs/jobs.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { UploadImageComponent } from './company-profile/upload-image/upload-image.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { DateAgoPipe } from './jobs/job-detail/date-ago.pipe';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { RtlDirective } from './jobs/rtl.directive';
import { AddCompanyComponent } from './company-profile/add-company/add-company.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   url: 'http://localhost:9080/webops-web/rest/employee/company/edit/image',
   maxFilesize: 1,
   paramName: 'image',
   acceptedFiles: 'image/*',
 };


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    LoginDialogComponent,
    SearchComponent,
    CompanyProfileComponent,
    SkillsComponent,
    JobComponent,
    EventComponent,
    EmployeeComponent,
    EditEventComponent,
    EditJobComponent,
    JobsComponent,
    UploadImageComponent,
    JobDetailComponent,
    DateAgoPipe,
    RtlDirective,
    AddCompanyComponent
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
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    GooglePlaceModule,
    NgSelectModule,
    DropzoneModule,
    NgxMapboxGLModule.withConfig({
      // tslint:disable-next-line: max-line-length
      accessToken: 'pk.eyJ1Ijoib3Vzc2FtYWZlIiwiYSI6ImNrM3hvMDUxZjBzZG8za3A2cHNyMzh3bWQifQ.zjwKRhcnIP_nowp9lPg5PA', // Optionnal, can also be set per map (accessToken input of mgl-map)
    })
  ],
  entryComponents:[
    LoginDialogComponent,
    EditEventComponent,
    EditJobComponent,
    UploadImageComponent,
    JobDetailComponent,
    AddCompanyComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    HttpClient,
    FormBuilder,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
