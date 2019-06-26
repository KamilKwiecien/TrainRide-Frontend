import { MapComponent } from './../map/map.component';
import { Injectable } from '@angular/core';
import { MapService } from './map.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private start;
  private end;

  private type;
  private withChange;

  changesCount = new Subject<number>();
  cost = new Subject<number>();
  distance = new Subject<number>();
  time = new Subject<number>();

  s = new Subject<string>();
  i = new Subject<string>();
  i2 = new Subject<string>();
  e = new Subject<string>();

  constructor(private mapService: MapService, private http: HttpClient) {

  }

  calculateRoute() {
    let headers = new HttpHeaders();
    const path: Path = ({
      sourceStation: this.start,
      destinationStation: this.end,
      type: this.type,
      withChange: !this.withChange
    });
    this.http.post<PathResponse>('http://localhost:8080/trainRide/path/route', path, { headers: headers }).subscribe(post => {
      console.log(post);
      this.changesCount.next(post.changesCount);
      this.cost.next(post.cost);
      this.distance.next(post.distance);
      this.time.next(post.time);

      this.s.next('');
      this.i.next('');
      this.i2.next('');
      this.e.next('');

      if(post.changesCount==0){
        this.s.next(post.stations[0].x+","+post.stations[0].y);
        this.i.next(post.stations[1].x+","+post.stations[1].y);
        this.i2.next(post.stations[1].x+","+post.stations[1].y);
        this.e.next(post.stations[1].x+","+post.stations[1].y);
      }
      if(post.changesCount==1){
        this.s.next(post.stations[0].x+','+post.stations[0].y);
        this.i.next(post.stations[1].x+','+post.stations[1].y);
        this.i2.next(post.stations[2].x+','+post.stations[2].y);
        this.e.next(post.stations[2].x+','+post.stations[2].y);
      }
      if(post.changesCount==2){
        this.s.next(post.stations[0].x+','+post.stations[0].y);
        this.i.next(post.stations[1].x+','+post.stations[1].y);
        this.i2.next(post.stations[2].x+','+post.stations[2].y);
        this.e.next(post.stations[3].x+','+post.stations[3].y);
      }
    });
  }

  setStart(start: string) {
    this.start = start;
    this.calculateRoute();
  }

  setEnd(end: string) {
    this.end = end;
    this.calculateRoute();
  }

  setType(type: string) {
    this.type = type;
    this.calculateRoute();
  }

  setWithChange(withChange: boolean) {
    this.withChange = withChange;
    this.calculateRoute();
  }

  getChangesCount(): Observable<number> {
    return this.changesCount.asObservable();
  }

  getCost(): Observable<number> {
    return this.cost.asObservable();
  }

  getDistance(): Observable<number> {
    return this.distance.asObservable();
  }

  getTime(): Observable<number> {
    return this.time.asObservable();
  }

  getS(): Observable<string> {
    return this.s.asObservable();
  }

  getI(): Observable<string> {
    return this.i.asObservable();
  }

  getI2(): Observable<string> {
    return this.i2.asObservable();
  }

  getE(): Observable<string> {
    return this.e.asObservable();
  }
}

export interface Path {
  sourceStation: string;
  destinationStation: string;
  type: string;
  withChange: boolean;
}

export interface PathResponse {
  changesCount: number;
  cost: number;
  distance: number;
  stations: Array<Stations>;
  time: number;
}

export interface Stations {
  id: number;
  stationName: string;
  x: string;
  y: string;
}
