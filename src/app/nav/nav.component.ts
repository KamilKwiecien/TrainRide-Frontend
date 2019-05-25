import { Component, OnInit, HostListener } from '@angular/core';
import { MapSizeService } from '../service/map-size.service';
import { HttpStationService } from '../service/http-station.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private mapSizeService: MapSizeService, private httpStationService: HttpStationService) { }

  stations;
  startPoint="Wybierz punkt początkowy";
  endPoint="Wybierz punkt docelowy";

  ngOnInit() {
    this.getAllStation();
  }

  setStartPoint(station){
    this.startPoint="Z: "+station.stationName;
  }

  setEndPoint(station){
    this.endPoint="Do: "+station.stationName;
  }

  getAllStation(){
    this.httpStationService.getGetAllStation().subscribe(stations =>{
      this.stations = stations;
    });
  }

  ngAfterViewInit() {
    this.mapSizeService.setHeight(document.getElementById("navbar").offsetHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize($event) {
    this.mapSizeService.changeHeight(document.getElementById("navbar").offsetHeight);
  }

}

export interface Station{
  id?: number;
  stationName?: string;
  x?: string;
  y?: string;
}
