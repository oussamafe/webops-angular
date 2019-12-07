import {Component, OnInit} from '@angular/core';
import {Question} from '../../../../models/Interview/Question';
import {OnlineTestService} from '../../../../services/Interview/online-test.service';
import {IAlert} from '../../../../sections/alerts-section/alerts-section.component';
import {ModalDismissReasons, NgbDate, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
    closeResult: string;

    focus;
    focus1;
    bool = false;

    private alertSucc: IAlert;
    question = this.actRoute.snapshot.params['q'];
    otidd = this.actRoute.snapshot.params['otid'];
    constructor(private modalService: NgbModal, private svc: OnlineTestService, private actRoute: ActivatedRoute, private router: Router) {
        this.alertSucc = {id: 1, type: 'success', strong: 'Updated !', message: '', icon: 'ni ni-like-2'};

    }

// npm install ngx-pagination --save
    qss: Question;
//  id: number ;
    p = 1;
    px: number;
    listQuestion: any[];
    ngOnInit() {
        if (!this.question) {
            this.svc.getListAllQuestion().subscribe(
                (data) => {
                    this.listQuestion = data;
                    this.px = Math.trunc(this.listQuestion.length / 10) + 1;
                }
            );
        } else {
            this.searchQ(this.question);
        }
    }

    searchQ(Q) {
        this.svc.serchByQuestion(Q).subscribe(
            (data) => {
                this.listQuestion = data;
                this.px = Math.trunc(this.listQuestion.length / 10) + 1;
            }
        );
    }

    DeleteQuestion(id) {
        if (window.confirm('Are you sure, you want to delete?')) {
            this.svc.DeleteQuestion(id).subscribe(data => {
                this.svc.getListAllQuestion().subscribe(
                    (datao) => this.listQuestion = datao);
            });
        }
    }

    updateQuestion(id, q, prop, event: any) {
        const editField = event.target.textContent;
        this.qss = q;
        if (prop === 'question' && editField !== this.qss.question) {
            this.qss.question = editField;
            this.svc.UpdateQuestion(id, this.qss).subscribe();
            this.bool = true;
        }
        if (prop === 'module' && editField !== this.qss.module) {
            this.qss.module = editField;
            this.svc.UpdateQuestion(id, this.qss).subscribe();
            this.bool = true;
        }
        if (prop === 'estimated' && editField !== this.qss.estimated_Time) {
            this.qss.estimated_Time = editField;
            this.svc.UpdateQuestion(id, this.qss).subscribe();
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
