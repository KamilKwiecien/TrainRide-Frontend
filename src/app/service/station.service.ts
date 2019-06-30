import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class StationService {
  StationInfo = new Subject<StationInfo>();

  constructor(private http: HttpClient, private router: Router) { }

  addStation(stationName: string, x: string, y: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const add: StationInfo = ({
      stationName,
      x,
      y,
    });
    this.http.post('http://localhost:8080/trainRide/station/create', add, { headers,  withCredentials: true }).subscribe(post => {
      window.alert('Dodano');
      window.location.replace('http://localhost:4200/admin');
    });
  }

  getStationInfo(): Observable<StationInfo> {
    return this.StationInfo.asObservable();
  }


}

export interface StationInfo {
  stationName?: string;
  x?: string;
  y?: string;
}

