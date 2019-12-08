import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InterviewService} from '../../../../services/Interview/interview.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IAlert} from '../../../../sections/alerts-section/alerts-section.component';
import {Interview} from '../../../../models/Interview/Interview';
import {AppliCandService} from '../../../../services/Interview/appli-cand.service';
import {AuthService} from '../../../../services/auth.service';
import {DatePipe} from '@angular/common';
import {InterviewType} from '../../../../models/Interview/InterviewType';

@Component({
    selector: 'app-interview',
    templateUrl: './interview.component.html',
    styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
    focus;
    focus1;
    p = 1;
    uid = this.actRoute.snapshot.params['uid'];
    px: number;
    private alertSucc: IAlert;
    listinterview: Interview[] = [];
    typeu: number;
    myDate = new Date();
    intertype = {type: '', hours_number: null, roleOfEmploye: ''};
    employer = {first_Name: '', last_Name: ''};
    candid = {first_Name: '', last_Name: ''};

    // tslint:disable-next-line:max-line-length
    constructor(private modalService: NgbModal, private svc: InterviewService, private actRoute: ActivatedRoute, private router: Router, private sapp: AppliCandService, private auth: AuthService) {
        this.alertSucc = {id: 1, type: 'success', strong: 'Updated !', message: '', icon: 'ni ni-like-2'};
    }

    ngOnInit() {
        this.iiniit();
    }

    iiniit() {
        if (this.uid) {
            this.sapp.getuserType(this.uid).subscribe((data) => {
                this.typeu = data;
                if (this.typeu === 0) {
                    this.svc.ListInterviewByCandidate(this.uid).subscribe((dodo) => {
                        this.listinterview = dodo;
                        this.px = Math.trunc(this.listinterview.length / 10) / 3 + 1;
                    });
                } else {
                    this.svc.ListInterviewByEmploye(this.uid).subscribe((dodo) => {
                        this.listinterview = dodo;
                        this.px = Math.trunc(this.listinterview.length / 10) + 1;
                    });
                }
            });
        } else {
            this.svc.ListAllInterview().subscribe(
                (data) => {
                    this.listinterview = data;
                    this.px = Math.trunc(this.listinterview.length / 10) + 1;
                }
            );
        }
    }

    setinter(iid) {
        this.svc.getTypeByidInterview(iid).subscribe(
            (data) => {
                this.intertype = data;
            }
        );
    //    this.svc.getEmployeByidInterview(iid).subscribe((data) => {
      //      this.employer = data;
        // });
        this.svc.getCandidateByidInterview(iid).subscribe((data) => {
            this.candid = data;
        });
    }

    compare(d) {
        return Date.parse(d) > this.myDate.getTime();
    }

    afterdate(d) {
        if (Date.parse(d) > this.myDate.getTime()) {
            return true;
        } else {
            return false;
        }
    }

    befordate(d) {
        // tslint:disable-next-line:prefer-const
        let tdn = new Date(Date.parse(d));
        if (Date.parse(d) < this.myDate.getTime() && tdn.getDate() < this.myDate.getDate()) {
            return true;
        } else {
            return false;
        }
    }

    today(d) {
        // tslint:disable-next-line:prefer-const
        let tdn = new Date(Date.parse(d));
        // tslint:disable-next-line:max-line-length
        return tdn.getFullYear() === this.myDate.getFullYear() && tdn.getMonth() === this.myDate.getMonth() && tdn.getDate() === this.myDate.getDate(); // && tdn.getHours() === this.myDate.getHours();
    }

    sillOnline(startHour, iid) {
        let x: number;
        this.svc.getTypeByidInterview(iid).subscribe((data) => x = data.hours_number);
        return startHour + x > this.myDate.getHours();
    }

    setNotonline(iid) {
        this.svc.setInterviewNotOnline(iid).subscribe(() => this.iiniit());
    }

    setonline(iid) {
        this.svc.setInterviewOnline(iid).subscribe(() => this.iiniit());
    }

    accept(id) {
        this.svc.SetValidInterview(id).subscribe(() => this.iiniit());
    }

    reject(id) {
        this.svc.SetInValidInterview(id).subscribe(() => this.iiniit());
    }
}
