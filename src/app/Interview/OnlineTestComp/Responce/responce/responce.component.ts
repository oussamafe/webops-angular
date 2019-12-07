import {Component, OnInit} from '@angular/core';
import {OnlineTestService} from '../../../../services/Interview/online-test.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Question} from '../../../../models/Interview/Question';
import {Responce} from '../../../../models/Interview/Responce';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IAlert} from '../../../../sections/alerts-section/alerts-section.component';

@Component({
    selector: 'app-responce',
    templateUrl: './responce.component.html',
    styleUrls: ['./responce.component.css']
})
export class ResponceComponent implements OnInit {
    px: number;
    p = 1;
    idq = this.actRoute.snapshot.params['idq'];
    otid = this.actRoute.snapshot.params['otid'];
    quest: { estimated_Time: number; question: string; module: string } = {question: '', module: '', estimated_Time: 2};
    listResponces: Responce[];
    res: Responce;
    bool = false;
    private alertSucc: IAlert;
    focus;
    focus1;
    closeResult: string;
    constructor(private modalService: NgbModal, private svc: OnlineTestService, private actRoute: ActivatedRoute, private router: Router) {
      this.alertSucc = {id: 1, type: 'success', strong: 'Updated !', message: '', icon: 'ni ni-like-2'};
    }
    responce = this.actRoute.snapshot.params['r'];
    ngOnInit() {
        this.svc.getQuestionbyid(this.idq).subscribe(
            (data) => {
                this.quest = data;
            }
        );
        if (!this.responce) {
            this.svc.ListResponceByQuestion(this.idq).subscribe(
                (data) => {
                    this.listResponces = data;
                    this.px = Math.trunc(this.listResponces.length / 10) + 1;
                }
            );
        } else {
            this.searchR(this.responce);
        }
    }
    searchR(R) {
        this.svc.serchByRespone(R, this.idq).subscribe(
            (data) => {
                this.listResponces = data;
                this.px = Math.trunc(this.listResponces.length / 10) + 1;
            }
        );
    }
    DeleteResponce(id) {
        if (window.confirm('Are you sure, you want to delete?')) {
            this.svc.DeleteResponce(id).subscribe(data => {
                this.svc.ListResponceByQuestion(this.idq).subscribe(
                    (datao) => this.listResponces = datao);
            });
        }
    }

    updateResponce(id, r, prop, event: any) {
        const editField = event.target.textContent;
        this.res = r;
        if (prop === 'reponce' && editField !== this.res.reponce) {
            this.res.reponce = editField;
            this.svc.UpdateResponce(id, this.res).subscribe();
            this.bool = true;
        }
    }
    open(content, type, modalDimension) {
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
