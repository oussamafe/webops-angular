import {Component, Input, OnInit} from '@angular/core';
import {NgbDate, NgbCalendar, NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CVService} from '../services/cv.service';
import {Candidate} from '../models/Candidate';
import {Course} from '../models/Course';
import * as moment from 'moment';
import {formatDate} from '@angular/common';
import {CandidateService} from '../services/candidate.service';
import {Skill} from '../models/Skill';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfessionalExperience} from '../models/ProfessionalExperience';
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
   // @Input() DetailsCandidates = {certifications: ' ', activities: ' '} ;
    selectedValue: Skill;
    Skills: Skill [] = [];
    Candidates: Candidate;
    ProfExp: ProfessionalExperience [] = [] ;
    skill: Skill [] = [] ;
    Course: Course [] = [] ;

    userID = this.Actrouter.snapshot.params['uid'];
    // tslint:disable-next-line:max-line-length
  constructor(public cvService: CVService , private Actrouter: ActivatedRoute , public candidateService: CandidateService, private modalService: NgbModal , private router: Router) {
      this.getSkills();  this.getCourse();
      this.getProfExp(); this.loadCandidate(); this.getSkill();
  }

  ngOnInit() {this.loadCandidate();
  }


  AddCourse() {
      // tslint:disable-next-line:max-line-length
      const date = this.DetailsCourse.startDate['year'] + '-' + this.DetailsCourse.startDate['month'] + '-' + this.DetailsCourse.startDate['day'];
      const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
      // tslint:disable-next-line:max-line-length
      const date2 = this.DetailsCourse.endDate['year'] + '-' + this.DetailsCourse.endDate['month'] + '-' + this.DetailsCourse.endDate['day'];
      const formattedDate2 = formatDate(date2, 'yyyy-MM-dd', 'en-US');
      this.DetailsCourse.startDate = formattedDate ;
      this.DetailsCourse.endDate = formattedDate2 ;
        this.cvService.addCourse( this.DetailsCourse)
        .subscribe(success => {
            this.cvService.getCourses(this.userID).subscribe((data) => {
                this.Course = data;
                this.modalService.dismissAll();
                this.router.navigate(['/EditCV/' + this.userID]);

            });
});
  }

    AddProfExp() {
        // tslint:disable-next-line:max-line-length
        const date = this.DetailsProfExp.startDate['year'] + '-' + this.DetailsProfExp.startDate['month'] + '-' + this.DetailsProfExp.startDate['day'];
        const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
        // tslint:disable-next-line:max-line-length
        const date2 = this.DetailsProfExp.endDate['year'] + '-' + this.DetailsProfExp.endDate['month'] + '-' + this.DetailsProfExp.endDate['day'];
        const formattedDate2 = formatDate(date2, 'yyyy-MM-dd', 'en-US');
        this.DetailsProfExp.startDate = formattedDate ;
        this.DetailsProfExp.endDate = formattedDate2 ;
        this.cvService.addProfessionalExp( this.DetailsProfExp)
            .subscribe(success => {
                this.cvService.getProfessionalExperiences(this.userID).subscribe((data) => {
                    this.ProfExp = data;
                    this.modalService.dismissAll();
                    this.router.navigate(['/EditCV/' + this.userID]);
                 }); });
    }
    addCertification() {
        this.cvService.AddCertif(this.Candidates.certifications).subscribe(dataa => {
            this.candidateService.getCandidate(this.userID).subscribe((data) => {
                this.Candidates = data;
                this.modalService.dismissAll();
                this.router.navigate(['/EditCV/' + this.userID]);
            }); });
    }
    addActivity() {
        this.cvService.AddActivity(this.Candidates
            .activities).subscribe(dataa => {
            this.candidateService.getCandidate(this.userID).subscribe((data) => {
                this.Candidates = data;
                this.modalService.dismissAll();
                this.router.navigate(['/EditCV/' + this.userID]);
            }); });
    }
    getSkills() {
        this.cvService.getSkillnotAffected().subscribe((data) => {
            this.Skills = data;

        });
    }
    addSkill() {
        this.cvService.addSkill(this.selectedValue.id).subscribe(data =>
            this.cvService.getSkills(this.userID).subscribe((datao) => {
            this.skill = datao;
                this.modalService.dismissAll();
                this.router.navigate(['/EditCV/' + this.userID]);
        }));
}
    getProfExp() {
        this.cvService.getProfessionalExperiences(this.userID).subscribe((data) => {
            this.ProfExp = data;
        });
    }
    getCourse() {
        this.cvService.getCourses(this.userID).subscribe((data) => {
            this.Course = data;

        });

    }
    loadCandidate() {
        this.candidateService.getCandidate(this.userID).subscribe((data) => {
            this.Candidates = data;
        });

    }
    open(content) {
        this.modalService.open(content , { size: 'sm' });
    }
    open1(content1) {
        this.modalService.open(content1 , { size: 'lg' });
    }
    open2(content2) {
        this.modalService.open(content2 , { size: 'lg' });
    }
    open3(content3) {
        this.modalService.open(content3 , { size: 'lg' });
    }
    open4(content4) {
        this.modalService.open(content4 , { size: 'lg' });
    }
    getSkill() {
        this.cvService.getSkills(this.userID).subscribe((data) => {
            this.skill = data;

        }); }
    deleteCourse(id) {
        if (window.confirm('Are you sure, you want to delete?')) {
            this.cvService.supprimerCourse(id).subscribe(data => {
                this.loadCandidate();
                this.cvService.getCourses(this.userID).subscribe((dataa) => {
                    this.Course = dataa;


                });
            });
        }
    }
    deleteProfExp(id) {
        if (window.confirm('Are you sure, you want to delete?')) {
            this.cvService.supprimerProfExp(id).subscribe(data => {
                this.loadCandidate();
                this.cvService.getProfessionalExperiences(this.userID).subscribe((dataa) => {
                    this.ProfExp = dataa;
                });
            });
        }
    }
}
