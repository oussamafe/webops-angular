import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyService } from 'src/app/services/company.service';
import { LocationLookupService } from 'src/app/services/location-lookup.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {

  @Input() public job;
  focus;
  focus1 = true;
  focus2;
  focus3;
  focus4;
  classic1;
  searching = false;
  searchingPlace = false;
  searchFailed = false;
  jobForm: FormGroup;
  skills: any[] = [];
  spinnerSkills = 'skills';
  spinnerPlaces = 'places';
  spinnerConfirm = 'confirm';
  types = ['Full-time', 'Part-time', 'Contract' , 'Temporary' , 'Volunteer' , 'Internship']
  levels = ['Internship', 'Entry level', 'Associate' , 'Mid-Senior level' , 'Director' , 'Executive','Not Applicable']
  formatter = (result: any) => result.normalized_skill_name;
  formatterPlace = (result: any) => result.label;

  
  // tslint:disable-next-line: max-line-length
  constructor(private modalService: NgbModal , private formBuilder: FormBuilder , private spinner: NgxSpinnerService , private companyService: CompanyService , private lookupService:LocationLookupService) { }

  ngOnInit() {
    console.log(this.job);
    this.jobForm = this.formBuilder.group({
      description: [this.job.description],
      job_title: [this.job.job_title],
      type: [this.job.type],
      level: [this.job.level],
      location: [this.job],
      available: [true],
      skills: [''],
      approvalDate: [this.job.approvalDate],
      depositDate: [this.job.depositDate],
      submittedBy: [this.job.submittedBy]
    });
    this.lookupService.lookup(this.job.location).subscribe(result => { this.jobForm.controls['location'].setValue(result.address)} );
    this.job.skills.forEach(element => { this.skills.push(element.type) ; });
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

  removeSkill(skill) {
    const index: number = this.skills.indexOf(skill);
      if (index !== -1) {
          this.skills.splice(index, 1);
      }
  }

  editJob() {
    let skillsList = [];
    this.skills.forEach(skill => {skillsList.push( { type : skill })});
    this.companyService.editJob(this.jobForm.value , skillsList , this.job.id ).subscribe(
      result => {console.log(result)},
      error => {console.log(error)},
      () => {} );
  }

}
