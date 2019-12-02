import {Component, Input, OnInit} from '@angular/core';
import {AppliCandService} from '../../../../services/Interview/appli-cand.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Candidate} from '../../../../models/Interview/Candidate';
import {JobOffer} from '../../../../models/Interview/JobOffer';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-candidate-offer-information',
    templateUrl: './candidate-offer-information.component.html',
    styleUrls: ['./candidate-offer-information.component.css']
})
export class CandidateOfferInformationComponent implements OnInit {

    closeResult: string;
    @Input() cid;
    @Input() jid;
  // tslint:disable-next-line:max-line-length
    ca: { id: number, first_Name: string, last_Name: string, email: string, skills: string, experiences: string, activities: string, studyLevel: string, profilIntro: string, phoneNumber: number, certifications: string } =
        // tslint:disable-next-line:max-line-length
        { id: null, first_Name: '', last_Name: '', email: '', skills: '', experiences: '', activities: '', studyLevel: '', profilIntro: '', phoneNumber: null, certifications: '' };
    //
    j: { id: number; description: string; job_title: string, skills: string, type: string, level: string} =
        {id: null, description: '', job_title: '', skills: '', type: '', level: ''};


    constructor(private svc: AppliCandService, private actRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {
    }

    ngOnInit() {
        this.svc.getCandidat(this.cid).subscribe((data) => this.ca = data);
        this.svc.getJobOffer(this.jid).subscribe((data) => this.j = data);
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    open(content, type, modalDimension) {
            this.modalService.open(content, { centered: true }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
    }
}
