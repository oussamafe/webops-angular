import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {ReclamationService} from '../services/reclamation.service';
import {Reclamation} from '../model/reclamtion.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-reclamation',
  templateUrl: './create-reclamation.component.html',
  styleUrls: ['./create-reclamation.component.css']
})
export class CreateReclamationComponent implements OnInit {

  constructor(public reclamationService: ReclamationService, private modalService: NgbModal) { }

    reclamation: Reclamation = new Reclamation();
    animalControl = new FormControl('', [Validators.required]);
  ngOnInit() {
  }

private add (form: NgForm) {
    console.log(this.reclamation);
    if (form.valid) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Votre Réclamation est bien prise en compte merci pour votre confiance',
            showConfirmButton: true,
            timer: 1500
        });
    return this.reclamationService.addReclamation(this.reclamation)
        .subscribe( (resp) => {
      console.log('successss' + resp);
      form.reset();
    });
    }
}
}
