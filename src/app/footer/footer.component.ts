import { Component, OnInit, HostListener } from '@angular/core';
import { MapSizeService } from '../service/map-size.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(private mapSizeService: MapSizeService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mapSizeService.setHeight(document.getElementById("footer").offsetHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize($event) {
    this.mapSizeService.changeHeight(document.getElementById("footer").offsetHeight);
  }

}
