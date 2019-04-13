import { Component, OnInit, HostListener } from '@angular/core';
import { MapSizeService } from '../service/map-size.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private mapSizeService: MapSizeService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mapSizeService.setHeight(document.getElementById("navbar").offsetHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize($event) {
    this.mapSizeService.changeHeight(document.getElementById("navbar").offsetHeight);
  }

}
