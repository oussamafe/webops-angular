import {Component, OnInit} from '@angular/core';
import {Application} from '../../../models/Interview/Application';
import {AppliCandService} from '../../../services/Interview/appli-cand.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OnlineTestService} from '../../../services/Interview/online-test.service';
import {InterviewService} from '../../../services/Interview/interview.service';

@Component({
    selector: 'app-applications',
    templateUrl: './applications.component.html',
    styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
    focus;
    focus1;
    listapplicaion: Application[];
    titleApp = 'Still Wait Applications';
    closeResult: string;

    // tslint:disable-next-line:max-line-length
    constructor(private ots: OnlineTestService, private its: InterviewService, private svc: AppliCandService, private actRoute: ActivatedRoute, private router: Router, private auth: AuthService, private modalService: NgbModal) {
    }

    ngOnInit() {
        this.svc.ApplicationStillWait().subscribe((data) => {
            this.listapplicaion = data;
        });
    }

    showstill() {
        this.svc.ApplicationStillWait().subscribe((data) => {
            this.titleApp = 'Still Wait Applications';
            this.listapplicaion = data;
            this.router.navigate(['/Applications']);
        });
    }

    showaccepted() {
        this.svc.ApplicationAccepted().subscribe((data) => {
            this.titleApp = 'Accepted Applications';
            this.listapplicaion = data;
            this.router.navigate(['/Applications']);
        });
    }

    showrejected() {
        this.svc.ApplicationRejected().subscribe((data) => {
            this.titleApp = 'Rejected Applications';
            this.listapplicaion = data;
            this.router.navigate(['/Applications']);
        });
    }

    acceptcand(can: Application) {
        this.svc.acceptApplication(can.id).subscribe(() => this.showstill());
    }

    rejectcand(can: Application) {
        this.svc.RejectApplication(can.id).subscribe(() => this.showstill());
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

    open(content, type, modalDimension) {
        this.modalService.open(content, {centered: true}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    chooseC(canid) {
            this.ots.addOnlineTest().subscribe((data) => {
                console.log(data);
                this.router.navigate(['/StepTwoTest/' + canid + '/' + data]);
            });
    }
}
