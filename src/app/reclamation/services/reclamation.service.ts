import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Reclamation} from '../model/reclamtion.model';
import 'rxjs-compat/add/operator/finally';
import {tap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';


@Injectable({providedIn: 'root'})
export class ReclamationService {
    constructor(public auth: AuthService, private http: HttpClient) { }
    private reclamation: Reclamation[] = [];
    private url = 'http://localhost:9080/webops-web/rest/claims';

    getReclamations(): Observable<Reclamation[]> {
        return this.http.get<Reclamation[]>(this.url + '/admin');
    }
    getUserReclamations(): Observable<Reclamation[]> {
        const urli = this.url + '/all/' + this.auth.getUserID();
        console.log(urli);
        return this.http.get<Reclamation[]>(urli);
    }
    addReclamation(rec: Reclamation): Observable<Reclamation> {
        return this.http.post<Reclamation>(this.url, rec).pipe(
            tap((resultat) => console.log('Résultat de la requête : ', resultat))
        );
    }

    repondreAuReclamation(rec: Reclamation): Observable<Reclamation> {
        return this.http.put<Reclamation>(this.url + '/admin', rec).pipe(
            tap((resultat) => console.log('Résultat de la requête : ', resultat))
        );
    }

    addclaimwithimage(rec: Reclamation, image: File) {
       // this.auth.getId();
        const postData = new FormData();
        postData.append('sujet', rec.sujet);
        postData.append('message', rec.message);
        postData.append('id', this.auth.getUserID());
        postData.append('image', image);
        this.http
            .post<{ message: string; post: Reclamation }>(
                'http://localhost:9080/webops-web/rest/claims/image',
                postData
            )
            .subscribe();

    }
    addclaiimage(image: File) {
        const postData = new FormData();
        postData.append('image', image);
        this.http
            .post<{ message: string; post: Reclamation }>(
                'http://localhost:9080/webops-web/rest/claims/image',
                postData
            )
            .subscribe();

    }
}
