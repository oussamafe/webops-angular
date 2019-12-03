import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Reclamation} from '../model/reclamtion.model';
import 'rxjs-compat/add/operator/finally';
import {tap} from 'rxjs/operators';
import {HelpAide} from '../model/help.model';


@Injectable({providedIn: 'root'})
export class HelpService {
    constructor(private http: HttpClient) { }
    private reclamation: Reclamation[] = [];
    url = 'http://localhost:9080/webops-web/rest/aide';

    getListSujet(): Observable<HelpAide[]> {
        return this.http.get<HelpAide[]>(this.url);
    }

    addSujet(rec: HelpAide): Observable<HelpAide> {
        return this.http.post<HelpAide>(this.url, rec).pipe(
            tap((resultat) => console.log('Résultat de la requête : ', resultat))
        );
    }
}
