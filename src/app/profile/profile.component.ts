import { Component, OnInit } from '@angular/core';
import {Candidate} from '../models/Candidate';
import {HttpClient} from '@angular/common/http';
import {CandidateService} from '../services/candidate.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ProfessionalExperience} from '../models/ProfessionalExperience';
import {Course} from '../models/Course';
import {Skill} from '../models/Skill';
import {CVService} from '../services/cv.service';
import {AuthService} from '../services/auth.service';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})

export class ProfileComponent implements OnInit {
    closeResult: string;
    DetailsCandidate: Candidate  ;
    ProfExp: ProfessionalExperience [] = [] ;
    skill: Skill [] = [] ;
    Course: Course [] = [] ;
    userID = this.Actrouter.snapshot.params['uid'];
    // tslint:disable-next-line:max-line-length
    constructor( private http: HttpClient, public candidateService: CandidateService, public cvService: CVService, public auto: AuthService,  private Actrouter: ActivatedRoute, private router: Router, config: NgbModalConfig, private modalService: NgbModal) {

       this.loadCandidate();
      this.getProfExp();
       this.getCourse();
      this.getSkill();
        config.backdrop = 'static';
        config.keyboard = false;
    }
    loadCandidate() {
        this.candidateService.getCandidate(this.userID).subscribe((data) => {
        this.DetailsCandidate = data;
     });

    }
    updateCandidate() {
        this.candidateService.updateCandidate(this.DetailsCandidate).subscribe((data) => {
            this.modalService.dismissAll();
            this.router.navigate(['/user-profile/' + this.userID]);
        });
    }
    getProfExp() {
        this.cvService.getProfessionalExperiences(this.userID).subscribe((data) => {
            this.ProfExp = data;
        });
    }
    getCourse() {
        this.cvService.getCourses(this.userID).subscribe((data) => {
            this.Course = data;
            console.log(this.Course );
        });
    }
    getSkill() {
        this.cvService.getSkills(this.userID).subscribe((data) => {
            this.skill = data;

        }); }

    ngOnInit() {

    }

    open(content) {
        this.modalService.open(content , { size: 'lg' });
    }

    open1(content, type, modalDimension) {
        if (modalDimension === 'sm' && type === 'modal_mini') {
            this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
                this.closeResult = 'Closed with: $result';
            }, (reason) => {
                this.closeResult = 'Dismissed $this.getDismissReason(reason)';
            });
        } else if (modalDimension === '' && type === 'Notification') {
            this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
                this.closeResult = 'Closed with: $result';
            }, (reason) => {
                this.closeResult = 'Dismissed $this.getDismissReason(reason)';
            });
        } else {
            this.modalService.open(content, { centered: true }).result.then((result) => {
                this.closeResult = 'Closed with: $result';
            }, (reason) => {
                this.closeResult = 'Dismissed $this.getDismissReason(reason)' ;
            });
        }
    }
}
