import {Component, Input, OnInit} from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {CVService} from '../services/cv.service';
import {Candidate} from '../models/Candidate';
import {Course} from '../models/Course';
import * as moment from 'moment';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CVComponent implements OnInit {
  focus;
  focus1;
    focus2;
 done = false ;
  @Input() DetailsCourse = {diploma: ' ', institution: ' ', endDate: ' ' , startDate: ' '} ;
  constructor(public cvService: CVService ) {   }

  ngOnInit() {
  }


  AddCourse() {
      const date = this.DetailsCourse.startDate['year'] + '-' + this.DetailsCourse.startDate['month'] + '-' + this.DetailsCourse.startDate['day'];
      const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
      const date2 = this.DetailsCourse.endDate['year'] + '-' + this.DetailsCourse.endDate['month'] + '-' + this.DetailsCourse.endDate['day'];
      const formattedDate2 = formatDate(date2, 'yyyy-MM-dd', 'en-US');
      this.DetailsCourse.startDate = formattedDate ;
      this.DetailsCourse.endDate = formattedDate2 ;
        this.cvService.addCourse( this.DetailsCourse)
        .subscribe(success => {
          if (success) {
            this.done = true ;
          }
          console.log(this.DetailsCourse);
        });
  }
}
