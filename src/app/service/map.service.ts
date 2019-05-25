import { MapComponent } from './../map/map.component';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MapService {
  private width;
  private height;
  private newHeight;
  private start;
  private s = new Subject<string>();
  private end;
  private e = new Subject<string>();

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.newHeight = 0;
  }

  setHeight(value:number): void {
    this.height -= value;
  }

  changeHeight(value:number):void{
    this.newHeight += value;
  }

  resize():void{
    this.height = window.innerHeight;
    this.height = this.height - this.newHeight;
    this.newHeight = 0;
  }

  getWidth(): number {
    this.width = window.innerWidth;
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  setStart(value:string):void{
    this.start = value;
    this.s.next(this.start);

  }

  getStart():string{
    return this.start;
  }

  setEnd(value:string):void{
    this.end = value;
    this.e.next(this.end);
  }

  getEnd():string{
    return this.end;
  }

  getS(): Observable<string>{
    return this.s.asObservable();
  }

  getE(): Observable<string>{
    return this.e.asObservable();
  }
}
