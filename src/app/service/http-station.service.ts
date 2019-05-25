import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from '../test/test.component';

@Injectable({
  providedIn: 'root'
})
export class HttpStationService {

  constructor(private http: HttpClient) { }

  getGetAllStation():Observable<Array<Station>>{
    return this.http.get<Array<Station>>('http://localhost:8080/trainRide/station');
  }
}
