import { Component, OnInit, HostListener } from '@angular/core';
import { MapService } from '../service/map.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private mapService: MapService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.mapService.setHeight(document.getElementById("header").offsetHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize($event) {
    this.mapService.changeHeight(document.getElementById("header").offsetHeight);
  }
}

