import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyService } from 'src/app/services/company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  searching = false;
  searchingPlace = false;
  searchFailed = false;
  eventForm: FormGroup;
  focus = false;
  focus1 = false;
  focus2 = false;
  focus3 = false;
  focus4 = false;
  focus5 = false;
  skills: any[] = [];
  spinnerSkills = 'skills';
  spinnerPlaces = 'places';
  spinnerConfirm = 'confirm';
  types = ['Formation' , 'WorkShop']
  formatter = (result: any) => result.normalized_skill_name;
  formatterPlace = (result: any) => result.label;


  constructor(private spinner: NgxSpinnerService , private companyService: CompanyService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      date: [''],
      type: [null],
      title: [''],
      nbParticipants: [null],
      location: ['', [Validators.required, Validators.pattern(/^[-+]?[0-9]{1,7}(\.[0-9]+)?$/)]],
      skills: [''],
      description: ['']
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

    selectSkill(item) {
      item.preventDefault();
      this.skills.push(item.item.normalized_skill_name);
      this.eventForm.controls['skills'].reset();
      this.spinner.hide('skills');
    }
  
    selectPlace(item) {
      item.preventDefault();
      this.eventForm.controls['location'].setValue(item.item.label)
      this.spinner.hide('places');
    }

    addEvent() {

      let date = this.eventForm.controls['date'].value ;
      let dateF = new Date(date.year, date.month-1, date.day);
      this.spinner.show('confirm', { fullScreen: false });
      let skillsList = [];
      this.skills.forEach(skill => {skillsList.push( { type : skill })})
      this.companyService.addEvent(this.eventForm.value , skillsList , dateF).subscribe(
        result => console.log(result) ,
        error => { this.spinner.hide('confirm') ; console.log(error) },
        () =>  this.spinner.hide('confirm')
      );
    }

}
