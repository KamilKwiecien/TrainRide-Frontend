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
  private intermediate;
  private i = new Subject<string>();
  private end;
  private e = new Subject<string>();

  constructor() {
    this.width = window.innerWidth-240;
    this.height = window.innerHeight-40;
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
    this.width = window.innerWidth-240;
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }
}
