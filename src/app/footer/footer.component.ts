import { Component, OnInit, HostListener } from '@angular/core';
import { MapService } from '../service/map.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(private mapService: MapService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mapService.setHeight(document.getElementById("footer").offsetHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize($event) {
    this.mapService.changeHeight(document.getElementById("footer").offsetHeight);
  }

}
