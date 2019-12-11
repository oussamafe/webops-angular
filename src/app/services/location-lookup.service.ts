import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { of, Observable, throwError, Observer } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as mapBoxGl from 'mapbox-gl';


@Injectable({
  providedIn: 'root'
})
export class LocationLookupService {

  rtl = false;
  constructor(private http: HttpClient) { }

  lookup(coord: string): Observable<any> {
    let cor = coord.split(',');
    let url = 'http://localhost:9080/webops-web/rest/search/lookup/';
    let link = url.concat(cor[0], '/', cor[1]);
    return this.http.get(link);
  }

  getCurrentPosition(): Observable<Position> {
    return Observable.create((observer: Observer<Position>) => {
      // Invokes getCurrentPosition method of Geolocation API.
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          observer.next(position);
          observer.complete();
        },
        (error: PositionError) => {
          console.log('Geolocation service: ' + error.message);
          observer.error(error);
        }
      );
    });
  }

  getJobsByLocation(location, distance): Observable<any> {
    console.log(location)
    const params = new HttpParams()
      .set('lat', location[1])
      .set('lon', location[0])
      .set('distance', distance);
    return this.http.post<any>('http://localhost:9080/webops-web/rest/search', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).pipe(
      map(result => result),
      catchError(error =>
        throwError(error.status))
    )
  }

  checkRTL() {
    if (!this.rtl) {
      mapBoxGl.setRTLTextPlugin('../assets/RtlMapbox.js', () => { });
      this.rtl = true
    }
  }
}
