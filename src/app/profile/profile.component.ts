import { Component, OnInit } from '@angular/core';
import {Candidate} from '../models/Candidate';
import {HttpClient} from '@angular/common/http';
import {CandidateService} from '../services/candidate.service';
import {Router} from '@angular/router';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ProfessionalExperience} from '../models/ProfessionalExperience';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})

export class ProfileComponent implements OnInit {
    DetailsCandidate: Candidate ;
    ProfExp: ProfessionalExperience ;
    constructor( private http: HttpClient, public candidateService: CandidateService, private router: Router, config: NgbModalConfig, private modalService: NgbModal) {
        this.loadEmployees();
        this.getProfExp();
        config.backdrop = 'static';
        config.keyboard = false;
    }
    loadEmployees() { this.candidateService.getCandidate().subscribe((data) => {
        this.DetailsCandidate = data;
        console.log(this.DetailsCandidate);
    });

    }
    getProfExp() {
        this.candidateService.getCandidate().subscribe((data) => {
            this.DetailsCandidate = data;
            this.DetailsCandidate.professionalExperiences.forEach(element => { this.ProfExp = element; });
            console.log(this.ProfExp);
        });
    }
    ngOnInit() {


    }


    open(content) {
        this.modalService.open(content , { size: 'lg' });
    }
}
