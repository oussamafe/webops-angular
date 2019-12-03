import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Reclamation} from '../model/reclamtion.model';
import 'rxjs-compat/add/operator/finally';
import {tap} from 'rxjs/operators';
import {PackModel} from '../model/pack.model';


@Injectable({providedIn: 'root'})
export class PackService {
    constructor(private http: HttpClient) { }
    private reclamation: Reclamation[] = [];
    private url = 'http://localhost:9080/webops-web/rest/packs';

    getPacks(): Observable<PackModel[]> {
        return this.http.get<PackModel[]>(this.url);
    }

    addPacks(rec: PackModel): Observable<PackModel> {
        return this.http.post<PackModel>(this.url, rec).pipe(
            tap((resultat) => console.log('Résultat de la requête : ', resultat))
        );
    }
}
