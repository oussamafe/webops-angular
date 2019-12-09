import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LocationLookupService } from '../services/location-lookup.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    employeeDetails = null;
    closeResult: string;
    adress: string[] = [];

    // tslint:disable-next-line: max-line-length
    constructor(private profileService: ProfileService, private authService: AuthService, private router: Router, private modalService: NgbModal , private locationService: LocationLookupService) {
        this.profileService.getEmployeeDetails().subscribe((data) => { this.employeeDetails = data; });
    }

    ngOnInit() {
        this.locationService.getCurrentPosition().subscribe(
            result => console.log(result) ,
            error => console.log(error)
        );
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/home']);
    }

    open(content, type, modalDimension) {
        if (modalDimension === 'sm' && type === 'modal_mini') {
            this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else if (modalDimension === '' && type === 'Notification') {
            this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else {
            this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
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

    lookupLocation(location , index) {
        this.locationService.lookup(location).subscribe(
            data => {
                this.adress[index] = data ;
            }
        );
    }

}
