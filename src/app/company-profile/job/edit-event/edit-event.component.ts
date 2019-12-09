import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyService } from 'src/app/services/company.service';
import { DatePipe } from '@angular/common';
import { LocationLookupService } from 'src/app/services/location-lookup.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  @Input() public event;
  focus;
  focus1 = true;
  focus2;
  focus3;
  focus4;
  classic1;
  searching = false;
  searchingPlace = false;
  searchFailed = false;
  eventForm: FormGroup;
  skills: any[] = [];
  spinnerSkills = 'skills';
  spinnerPlaces = 'places';
  spinnerConfirm = 'confirm';
  types = ['Formation' , 'WorkShop']
  formatter = (result: any) => result.normalized_skill_name;
  formatterPlace = (result: any) => result.label;
  location = null;

  // tslint:disable-next-line: max-line-length
  constructor(private modalService: NgbModal , private formBuilder: FormBuilder , private spinner: NgxSpinnerService , private companyService: CompanyService , private lookupService:LocationLookupService, private datePipe: DatePipe) { }

  ngOnInit() {
    var date = new Date(this.datePipe.transform(this.event.date , 'yyyy-MM-dd' , 'CET'));
    let datePicker = { year: date.getUTCFullYear() , month: date.getMonth()+1, day: date.getUTCDate() };
    this.eventForm = this.formBuilder.group({
      date: [datePicker],
      type: [this.event.type],
      title: [this.event.title],
      nbParticipants: [this.event.nbParticipants],
      location: [this.location],
      skills: [''],
      description: [this.event.description]
    });
    this.lookupService.lookup(this.event.location).subscribe(result => { this.eventForm.controls['location'].setValue(result.address)} );
    this.event.skills.forEach(element => { this.skills.push(element.type) ; });
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

    removeSkill(skill) {
      const index: number = this.skills.indexOf(skill);
        if (index !== -1) {
            this.skills.splice(index, 1);
        }
    }

    editEvent() {

      let date = this.eventForm.controls['date'].value ;
      let dateF = new Date(date.year, date.month-1, date.day);
      let skillsList = [];
      this.skills.forEach(skill => {skillsList.push( { type : skill })});
      this.companyService.editEvent(this.eventForm.value , dateF , skillsList , this.event.id ).subscribe(
        result => {console.log(result)},
        error => {console.log(error)},
        () => {} );
    }

}
