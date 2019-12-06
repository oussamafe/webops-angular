import {Component, Input, OnInit} from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {CVService} from '../services/cv.service';
import {Candidate} from '../models/Candidate';
import {Course} from '../models/Course';
import * as moment from 'moment';
import {formatDate} from '@angular/common';
import {CandidateService} from '../services/candidate.service';
import {Skill} from '../models/Skill';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CVComponent implements OnInit {
  focus;
  focus1;
    focus2;
    focus0;
    focus11;
    focus21;
 done = false ;
    done1 = false ;
  @Input() DetailsCourse = {diploma: ' ', institution: ' ', endDate: ' ' , startDate: ' '} ;
    @Input() DetailsProfExp = {description: ' ', company: ' ', endDate: ' ' , startDate: ' ', place: ''} ;
    @Input() DetailsCandidate = {certifications: ' ' , activity: ''} ;
    selectedValue: Skill;
    Skills: Skill [] = [];
    //userID = this.Actrouter.snapshot.params['uid'];
  constructor(public cvService: CVService ) { this.getSkills();   }

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

    AddProfExp() {
        const date = this.DetailsProfExp.startDate['year'] + '-' + this.DetailsProfExp.startDate['month'] + '-' + this.DetailsProfExp.startDate['day'];
        const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
        const date2 = this.DetailsProfExp.endDate['year'] + '-' + this.DetailsProfExp.endDate['month'] + '-' + this.DetailsProfExp.endDate['day'];
        const formattedDate2 = formatDate(date2, 'yyyy-MM-dd', 'en-US');
        this.DetailsProfExp.startDate = formattedDate ;
        this.DetailsProfExp.endDate = formattedDate2 ;
        this.cvService.addProfessionalExp( this.DetailsProfExp)
            .subscribe(success => {
                if (success) {
                    this.done1 = true ;
                }
                console.log(this.DetailsProfExp);
            });
    }
    addCertification() {
        this.cvService.AddCertif(this.DetailsCandidate.certifications).subscribe();
        console.log(this.DetailsCandidate.certifications);
    }
    addActivity() {
        this.cvService.AddActivity(this.DetailsCandidate.activity).subscribe();
        console.log(this.DetailsCandidate.activity);
    }
    getSkills() {
        this.cvService.getSkillnotAffected().subscribe((data) => {
            this.Skills = data;

        });
    }
    addSkill() {
        this.cvService.addSkill(this.selectedValue.id).subscribe();
        console.log(this.DetailsCandidate.activity);
    }
}
