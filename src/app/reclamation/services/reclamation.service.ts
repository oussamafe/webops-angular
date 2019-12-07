import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Reclamation} from '../model/reclamtion.model';
import 'rxjs-compat/add/operator/finally';
import {tap} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class ReclamationService {
    constructor(private http: HttpClient) { }
    private reclamation: Reclamation[] = [];
    private url = 'http://localhost:9080/webops-web/rest/claims';

    getReclamations(): Observable<Reclamation[]> {
        return this.http.get<Reclamation[]>(this.url + '/admin');
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

   /* addclaimwithimage(rec: Reclamation) {
        const postData = new FormData(rec);
        postData.append(rec);
        this.http
            .post<{ message: string; post: Post }>(
                "http://localhost:3000/api/posts",
                postData
            )
            .subscribe(responseData => {
                const post: Post = {
                    id: responseData.post.id,
                    title: title,
                    content: content,
                    imagePath: responseData.post.imagePath
                };
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
                this.router.navigate(["/"]);
            });
    }*/
}
