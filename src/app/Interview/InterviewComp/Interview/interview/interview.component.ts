import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InterviewService} from '../../../../services/Interview/interview.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IAlert} from '../../../../sections/alerts-section/alerts-section.component';
import {Interview} from '../../../../models/Interview/Interview';
import {AppliCandService} from '../../../../services/Interview/appli-cand.service';
import {AuthService} from '../../../../services/auth.service';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-interview',
    templateUrl: './interview.component.html',
    styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
    closeResult: string;
    focus;
    focus1;
    p = 1;
    uid = this.actRoute.snapshot.params['uid'];
    px: number;
    bool = false;
    private alertSucc: IAlert;
    listinterview: Interview[];
    titleinterview = 'All Interview';
    typeu: number;
    myDate = new Date();


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

    open(content) {
        if (this.bool === true) {
            this.modalService.open(content, {centered: true}).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
            this.bool = false;
        }
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
