import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
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
    imagePreview: string | ArrayBuffer;
    form: FormGroup;
    reclamation: Reclamation = new Reclamation();

  ngOnInit() {
      this.form = new FormGroup({
          sujet: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
          }),
          message: new FormControl(null, { validators: [Validators.required] }),
          image: new FormControl(null)
      });
  }

private add () {
if (this.form.valid) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Votre Réclamation est bien prise en compte merci pour votre confiance',
            showConfirmButton: true,
            timer: 1500
        });
    /* this.reclamationService.addReclamation(this.reclamation)
        .subscribe( (resp) => {
      this.form.reset();
    });*/
} else {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Verifiez les champs',
        showConfirmButton: true,
        timer: 1500
    });
}

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
        console.log(this.form.value.image);
    }
}
