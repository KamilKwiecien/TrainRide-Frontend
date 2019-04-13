import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MapSizeService {
  private width;
  private height;
  private newHeight;

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
}
