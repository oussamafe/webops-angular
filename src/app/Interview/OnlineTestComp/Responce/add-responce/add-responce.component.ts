import {Component, OnInit} from '@angular/core';
import {OnlineTestService} from '../../../../services/Interview/online-test.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Question} from '../../../../models/Interview/Question';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-add-responce',
    templateUrl: './add-responce.component.html',
    styleUrls: ['./add-responce.component.css']
})
export class AddResponceComponent implements OnInit {

    idq = this.actRoute.snapshot.params['idq'];
    otid = this.actRoute.snapshot.params['otid'];
    cidd = this.actRoute.snapshot.params['cid'];
    qid = this.actRoute.snapshot.params['qid'];
    quest: { estimated_Time: number; question: string; module: string } = {question: '', module: '', estimated_Time: 2};
    res = {reponce: '', isValid: true};
    closeResult: string;

    constructor(private svc: OnlineTestService, private actRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {
    }

    ngOnInit() {
        if (this.otid && this.cidd && this.qid) {
            this.svc.getQuestionbyid(this.qid).subscribe(
                (data) => {
                    this.quest = data;
                }
            );
        } else {
            this.svc.getQuestionbyid(this.idq).subscribe(
                (data) => {
                    this.quest = data;
                }
            );
        }
    }

    check(bo) {
        this.res.isValid = bo;
    }

    YES() {
        // tslint:disable-next-line:max-line-length
        this.svc.AffectQuestionToAnOnlineTest(this.otid, this.qid).subscribe(
            (data) => this.router.navigate(['/StepTwoTest/' + this.cidd + '/' + this.otid])
        );
    }

    addResp() {
        if (this.otid && this.cidd && this.qid) {
            this.svc.addAndAffectResponce(this.qid, this.res).subscribe(() => this.res = {reponce: '', isValid: true});
        } else {
            this.svc.addAndAffectResponce(this.idq, this.res)
                .subscribe(
                    (data) => this.router.navigate(['/Responce/' + this.idq])
                );
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

    open(content) {
        this.modalService.open(content, {centered: true}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
}
