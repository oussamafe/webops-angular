import { Component, OnInit } from '@angular/core';
import {Candidate} from '../models/Candidate';
import {HttpClient} from '@angular/common/http';
import {CandidateService} from '../services/candidate.service';
import {Router} from '@angular/router';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ProfessionalExperience} from '../models/ProfessionalExperience';
import {Course} from '../models/Course';
import {Skill} from '../models/Skill';
import {CVService} from '../services/cv.service';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})

export class ProfileComponent implements OnInit {
    DetailsCandidate: Candidate ;
    ProfExp: ProfessionalExperience [] = [] ;
    skill: Skill [] = [] ;
    Course: Course [] = [] ;
    // tslint:disable-next-line:max-line-length
    constructor( private http: HttpClient, public candidateService: CandidateService, public cvService: CVService,  private router: Router, config: NgbModalConfig, private modalService: NgbModal) {
        this.loadCandidate();
        this.getProfExp();
        this.getCourse();
        this.getSkill();
        config.backdrop = 'static';
        config.keyboard = false;
    }
    loadCandidate() { this.candidateService.getCandidate().subscribe((data) => {
        this.DetailsCandidate = data;
     });

    }
    getProfExp() {
        this.cvService.getProfessionalExperiences().subscribe((data) => {
            this.ProfExp = data;
        });
    }
    getCourse() {
        this.cvService.getCourses().subscribe((data) => {
            this.Course = data;
            console.log(this.Course );
        });
    }
    getSkill() {
        this.cvService.getSkills().subscribe((data) => {
            this.skill = data;

        }); }

    ngOnInit() {


    }

    open(content) {
        this.modalService.open(content , { size: 'lg' });
    }
}
