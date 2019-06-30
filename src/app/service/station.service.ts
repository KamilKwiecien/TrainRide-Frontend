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
  editStation(stationName: string, x: string, y: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const edit: StationInfo = ({
      stationName,
      x,
      y,
    });
    this.http.post('http://localhost:8080/trainRide/station/update', edit, { headers,  withCredentials: true }).subscribe(post => {
      window.alert('Edytowano poprawnie');
      window.location.replace('http://localhost:4200/admin');
    });
  }
  deleteStation(stationName: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const remove: StationInfo = ({
      stationName,
    });
    this.http.post('http://localhost:8080/trainRide/station/delete', remove, { headers,  withCredentials: true }).subscribe(post => {
      window.alert('Usunięto poprawnie');
      window.location.replace('http://localhost:4200/admin');
    });
  }

  addConn(sourceStation: string, destinationStation: string, distance: string, travelTime: string, cost: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const add: ConnInfo = ({
      sourceStation,
      destinationStation,
      distance,
      travelTime,
      cost
    });
    this.http.post('http://localhost:8080/trainRide/connection/create', add, { headers,  withCredentials: true }).subscribe(post => {
      window.alert('Dodano');
      window.location.replace('http://localhost:4200/admin');
    });
  }
  editConn(sourceStation: string, destinationStation: string, distance: string, travelTime: string, cost: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const add: ConnInfo = ({
      sourceStation,
      destinationStation,
      distance,
      travelTime,
      cost
    });
    this.http.post('http://localhost:8080/trainRide/connection/update', add, { headers,  withCredentials: true }).subscribe(post => {
      window.alert('Zmodyfikowano');
      window.location.replace('http://localhost:4200/admin');
    });
  }
  deleteConn(sourceStation: string, destinationStation: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const add: ConnInfo = ({
      sourceStation,
      destinationStation
    });
    this.http.post('http://localhost:8080/trainRide/connection/delete', add, { headers,  withCredentials: true }).subscribe(post => {
      window.alert('Usunięto');
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
export interface ConnInfo {
  sourceStation?: string;
  destinationStation?: string;
  distance?: string;
  travelTime?: string;
  cost?: string;
}
