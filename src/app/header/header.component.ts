import { Component, OnInit, HostListener } from '@angular/core';
import { MapSizeService } from '../service/map-size.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private mapSizeService: MapSizeService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.mapSizeService.setHeight(document.getElementById("header").offsetHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize($event) {
    this.mapSizeService.changeHeight(document.getElementById("header").offsetHeight);
  }
}

