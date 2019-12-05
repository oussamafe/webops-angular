import { Component, OnInit } from '@angular/core';
import {ReclamationService} from '../services/reclamation.service';
import {Reclamation} from '../model/reclamtion.model';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ReclamationComponent} from '../reclamation.component';
import {SendReclamationComponent} from '../send-reclamation/send-reclamation.component';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css']
})
export class ListReclamationComponent implements OnInit {

  constructor(public reclamationService: ReclamationService, private dialog: MatDialog) { }
  claims: Reclamation[];

  ngOnInit() {
    this.reclamationService.getReclamations().subscribe(
        (recl: Reclamation[]) => {this.claims = recl;
        });
  }
  reclamationDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.ariaLabel = 'reclamation';
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100%';
    dialogConfig.panelClass = 'dialog';
    this.dialog.open(SendReclamationComponent, dialogConfig);
  }

}
