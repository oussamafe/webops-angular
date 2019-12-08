import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyService } from 'src/app/services/company.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  searching = false;
  searchingPlace = false;
  searchFailed = false;
  skills: any[] = [];
  jobForm: FormGroup;
  focus = false;
  focus1 = false;
  focus2 = false;
  focus3 = false;
  focus4 = false;
  focus5 = false;
  spinnerSkills = 'skills';
  spinnerPlaces = 'places';
  spinnerConfirm = 'confirm';
  types = ['Full-time', 'Part-time', 'Contract' , 'Temporary' , 'Volunteer' , 'Internship']
  levels = ['Internship', 'Entry level', 'Associate' , 'Mid-Senior level' , 'Director' , 'Executive','Not Applicable']
  formatter = (result: any) => result.normalized_skill_name;
  formatterPlace = (result: any) => result.label;

  constructor(private spinner: NgxSpinnerService , private companyService: CompanyService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.jobForm = this.formBuilder.group({
      description: [''],
      job_title: [''],
      type: [null],
      level: [null],
      location: ['', [Validators.required, Validators.pattern(/^[-+]?[0-9]{1,7}(\.[0-9]+)?$/)]],
      available: [true],
      skills: ['']
    });
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => { this.searching = true, this.spinner.show('skills', { fullScreen: false }); }),
      switchMap(term => 
        this.companyService.autoCompleteSkills(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => { this.searching = false, this.spinner.hide('skills')})
    )

    searchPlace = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => { this.searchingPlace = true, this.spinner.show('places', { fullScreen: false }); }),
      switchMap(term =>
        this.companyService.autoCompleteAddress(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => { this.searchingPlace = false, this.spinner.hide('places')})
    )

  getLocationCoodinates(adress) {
    this.companyService.getAdressCoodinates(adress.value).subscribe(location => {
      const latlonS = location['lat'] + ',' + location['lng'];
      this.jobForm.controls['location'].setValue(latlonS);
    });
  }

  showList() {
    console.log(this.skills);
  }

  selectSkill(item) {
    item.preventDefault();
    this.skills.push(item.item.normalized_skill_name);
    this.jobForm.controls['skills'].reset();
    this.spinner.hide('skills');
  }

  selectPlace(item) {
    item.preventDefault();
    this.jobForm.controls['location'].setValue(item.item.label)
    this.spinner.hide('places');
  }

  addJob() {
    this.spinner.show('confirm', { fullScreen: false });
    let skillsList = [];
    this.skills.forEach(skill => {skillsList.push( { type : skill }) })
    this.companyService.addJobOffer(this.jobForm.value , skillsList).subscribe(
      result => console.log(result) ,
      error => console.log(error),
      () =>  this.spinner.hide('confirm')
    );
  }

}
