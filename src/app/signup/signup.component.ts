import {Component, Input, OnInit} from '@angular/core';
import {CandidateService} from '../services/candidate.service';
import {Router} from '@angular/router';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    @Input() candidateDetails = { first_Name: '', last_Name: '', email: '' , password: ''}
    test: Date = new Date();
    focus;
    focus1;
    focus2;
    IsShow  ;
    IsShow1  ;
    constructor(public candidate: CandidateService, public router: Router, config: NgbModalConfig, private modalService: NgbModal) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
        this.IsShow = false ;
        this.IsShow1 = false ;

    }

    showCandidateForm() {
        this.IsShow = !this.IsShow;
        this.IsShow1 = false ;
        console.log(this.IsShow);
    }

    showCompanyForm() {
        this.IsShow1 = !this.IsShow1;
        this.IsShow = false ;
        console.log(this.IsShow1);
    }

    addCandidate(content) {
        this.candidate.createCandidate(this.candidateDetails).subscribe();
        this.modalService.open(content);

    }

    Home() {
        this.modalService.dismissAll();
        this.router.navigate(['home']);
    }
}
