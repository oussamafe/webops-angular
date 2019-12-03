import {Component, OnInit} from '@angular/core';
import {OnlineTestService} from '../../../services/Interview/online-test.service';
import {Candidate} from '../../../models/Interview/Candidate';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {AppliCandService} from '../../../services/Interview/appli-cand.service';
import {Application} from '../../../models/Interview/Application';

@Component({
    selector: 'app-in-wait',
    templateUrl: './in-wait.component.html',
    styleUrls: ['./in-wait.component.css']
})
export class InWaitComponent implements OnInit {

    job: { id: number; description: string; job_title: string, skills: string, type: string, level: string } =
        {id: null, description: '', job_title: '', skills: '', type: '', level: ''};
    // tslint:disable-next-line:max-line-length
    candida: { id: number, first_Name: string, last_Name: string, email: string, skills: string, experiences: string, activities: string, studyLevel: string, profilIntro: string, phoneNumber: number, certifications: string } =
        // tslint:disable-next-line:max-line-length
        {
            id: null,
            first_Name: '',
            last_Name: '',
            email: '',
            skills: '',
            experiences: '',
            activities: '',
            studyLevel: '',
            profilIntro: '',
            phoneNumber: null,
            certifications: ''
        };
    listapplicaion: Application[];
    closeResult: string;
    p = 1;
    px: number;

    // tslint:disable-next-line:max-line-length
    constructor(private jsvc: AppliCandService, private svc: OnlineTestService, private actRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {
    }

    ngOnInit() {
        this.svc.getCandidateWaitFortest().subscribe(
            (data) => {
                this.listapplicaion = data;
                this.px = Math.trunc(this.listapplicaion.length / 10) + 1;
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

    openj(content, jid, modalDimension) {
        this.jsvc.getJobOffer(jid).subscribe((data) => this.job = data);
        this.modalService.open(content, {centered: true}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openc(content, cid, modalDimension) {
        this.jsvc.getCandidat(cid).subscribe((data) => this.candida = data);
        this.modalService.open(content, {centered: true}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    chooseC(ChosedC) {
        this.svc.addOnlineTest().subscribe((data) => {
            this.router.navigate(['/StepTwoTest/' + ChosedC + '/' + data]);
        });
    }
}
