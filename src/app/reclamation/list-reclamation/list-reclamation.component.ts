import { Component, OnInit } from '@angular/core';
import {ReclamationService} from '../services/reclamation.service';
import {Reclamation} from '../model/reclamtion.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css']
})
export class ListReclamationComponent implements OnInit {

  constructor(public reclamationService: ReclamationService) { }
  claims: Reclamation[];
  private claimSub: Subscription;

  ngOnInit() {
    this.claimSub = this.reclamationService.getReclamations().subscribe(
        (recl: Reclamation[]) => {this.claims = recl;
        });
  }

}
