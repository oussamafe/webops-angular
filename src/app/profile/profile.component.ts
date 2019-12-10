import { Component, OnInit } from '@angular/core';
import {Candidate} from '../models/Candidate';
import {HttpClient} from '@angular/common/http';
import {CandidateService} from '../services/candidate.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ProfessionalExperience} from '../models/ProfessionalExperience';
import {Course} from '../models/Course';
import {Skill} from '../models/Skill';
import {CVService} from '../services/cv.service';

import {FriendsService} from '../services/friends.service';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})

export class ProfileComponent implements OnInit {
    imagePreview: string | ArrayBuffer;
    closeResult: string;
    DetailsCandidate: Candidate  ;
    Friends: Candidate [] = [] ;
    ProfExp: ProfessionalExperience [] = [] ;
    skill: Skill [] = [] ;
    Course: Course [] = [] ;
    userID = this.Actrouter.snapshot.params['uid'];
    form: FormGroup;
    // tslint:disable-next-line:max-line-length
    constructor(private http: HttpClient, public candidateService: CandidateService, public friendsSrv: FriendsService, public cvService: CVService, public auto: AuthService, private Actrouter: ActivatedRoute, private router: Router, config: NgbModalConfig, private modalService: NgbModal) {

                     config.backdrop = 'static';
                    config.keyboard = false;

    }
    loadCandidate() {
        this.candidateService.getCandidate(this.userID).subscribe((data) => {
        this.DetailsCandidate = data;
     });

    }
    loadFriends() {
        this.friendsSrv.getFriends().subscribe((data) => {
            this.Friends = data;
        });

    }
    updateCandidate() {
        this.candidateService.updateCandidate(this.DetailsCandidate).subscribe((data) => {
            this.modalService.dismissAll();
            this.router.navigate(['/user-profile/' + this.userID]);
        });
    }
    getProfExp() {
        this.cvService.getProfessionalExperiences(this.userID).subscribe((data) => {
            this.ProfExp = data;
        });
    }
    getCourse() {
        this.cvService.getCourses(this.userID).subscribe((data) => {
            this.Course = data;
            console.log(this.Course );
        });
    }
    getSkill() {
        this.cvService.getSkills(this.userID).subscribe((data) => {
            this.skill = data;

        }); }

    ngOnInit() {
        this.form = new FormGroup({
            image: new FormControl(null)
        });
        this.loadFriends() ;
        this.loadCandidate();
        this.getProfExp();
        this.getCourse();
        this.getSkill();
    }

    open(content) {
        this.modalService.open(content , { size: 'lg' });
    }

    open1(content, type, modalDimension) {
        if (modalDimension === 'sm' && type === 'modal_mini') {
            this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
                this.closeResult = 'Closed with: $result';
            }, (reason) => {
                this.closeResult = 'Dismissed $this.getDismissReason(reason)';
            });
        } else if (modalDimension === '' && type === 'Notification') {
            this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
                this.closeResult = 'Closed with: $result';
            }, (reason) => {
                this.closeResult = 'Dismissed $this.getDismissReason(reason)';
            });
        } else {
            this.modalService.open(content, { centered: true }).result.then((result) => {
                this.closeResult = 'Closed with: $result';
            }, (reason) => {
                this.closeResult = 'Dismissed $this.getDismissReason(reason)' ;
            });
        }
    }
    openfriends(contentfriends) {
        this.modalService.open(contentfriends , { size: 'sm' });
    }

    navigate(id: number) {
        this.modalService.dismissAll();
        this.router.navigate(['/user-profile/' + id + '/Contacts']);
    }
    deletefriend(id) {
        if (window.confirm('Are you sure, you want to delete?')) {
            this.friendsSrv.RemoveFriend(id).subscribe(data => {
                this.loadFriends();
                this.friendsSrv.getFriends().subscribe((dataa) => {
                    this.Friends = dataa;
                });
            });
        }
    }
    uploadimage(image) {
        this.modalService.open(image , { size: 'sm' });
    }
    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
         this.form.patchValue({ image: file });
         this.form.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
        //  console.log(this.form.value.image);
    }
    updateImage() {
        this.candidateService.updateimage(this.form.value.image).subscribe((data) => {
            this.modalService.dismissAll();
            this.router.navigate(['/user-profile/' + this.userID]);
        });
    }
}
