import {Component, OnInit} from '@angular/core';
import {InterviewType} from '../../../../models/Interview/InterviewType';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {InterviewService} from '../../../../services/Interview/interview.service';
import {IAlert} from '../../../../sections/alerts-section/alerts-section.component';
import {Question} from '../../../../models/Interview/Question';

@Component({
    selector: 'app-interview-type',
    templateUrl: './interview-type.component.html',
    styleUrls: ['./interview-type.component.css']
})
export class InterviewTypeComponent implements OnInit {

    constructor(private modalService: NgbModal, private svc: InterviewService, private actRoute: ActivatedRoute, private router: Router) {
        this.alertSucc = {id: 1, type: 'success', strong: 'Updated !', message: '', icon: 'ni ni-like-2'};
    }

    type = {type: null, hours_number: null, roleOfEmploye: ''};
    focus;
    focus1;
    qss: InterviewType;
    listtype: InterviewType[];
    closeResult: string;
    p = 1;
    px: number;
    bool = false;
    private alertSucc: IAlert;

    ngOnInit() {
        this.svc.ListAllInterviewType().subscribe(
            (data) => {
                this.listtype = data;
                this.px = Math.trunc(this.listtype.length / 10) + 1;
            }
        );
    }

    Deletetype(id) {
        if (window.confirm('Are you sure, you want to delete?')) {
            this.svc.DeleteInterviewType(id).subscribe(data => {
                this.svc.ListAllInterviewType().subscribe(
                    (datao) => this.listtype = datao);
            });
        }
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

    updatetype(id, q, prop, event: any, op) {
        const editField = event.target.textContent;
        this.qss = q;
        if (prop === 'type' && editField !== this.qss.type) {
            this.qss.type = editField;
            this.svc.UpdateInterviewType(id, this.qss).subscribe();
            this.bool = true;
        }
        if (prop === 'hours_number' && editField !== this.qss.hours_number) {
            this.qss.hours_number = editField;
            this.svc.UpdateInterviewType(id, this.qss).subscribe();
            this.bool = true;
        }
        if (prop === 'roleOfEmploye' && editField !== this.qss.roleOfEmploye) {
            this.qss.roleOfEmploye = op;
            this.svc.UpdateInterviewType(id, this.qss).subscribe();
            this.bool = true;
        }
    }

    searchByT(Q) {
        this.svc.ListAllInterviewTypeByType(Q).subscribe(
            (data) => {
                this.listtype = data;
                this.px = Math.trunc(this.listtype.length / 10) + 1;
            }
        );
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

    addtype(roleOfEmploye) {
        this.type.roleOfEmploye = roleOfEmploye;
        this.svc.AddInterviewType(this.type)
            .subscribe(
                (data) => {
                    this.svc.ListAllInterviewType().subscribe(
                        (dodo) => {
                            this.listtype = dodo;
                            this.px = Math.trunc(this.listtype.length / 10) + 1;
                        }
                    );
                    this.type = {type: null, hours_number: null, roleOfEmploye: ''};
                });
    }

    openforadde(content) {
        this.modalService.open(content, {centered: true}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        });
    }
}
