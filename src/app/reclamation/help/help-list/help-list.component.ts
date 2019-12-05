import { Component, OnInit } from '@angular/core';
import {HelpAide} from '../../model/help.model';
import {HelpService} from '../../services/help.service';

@Component({
  selector: 'app-help-list',
  templateUrl: './help-list.component.html',
  styleUrls: ['./help-list.component.css']
})
export class HelpListComponent implements OnInit {

  constructor(public helpService: HelpService) { }
  sujet: HelpAide[];
  module: HelpAide[];
  description: string;
  titre: string;
  ngOnInit() {
    this.helpService.getListSujet().subscribe(
        (recl: HelpAide[]) => {this.sujet = recl;
        });
  }
chargerlesmodule(sujet: string) {
    this.module = [];
  this.helpService.getListModule(sujet).subscribe(
      (recl: HelpAide[]) => {this.module = recl;
      });
}
descriptionClick(mod, rec){
    console.log('hello ' + mod + rec);
    this.titre = mod;
    this.description = rec;
}
}
