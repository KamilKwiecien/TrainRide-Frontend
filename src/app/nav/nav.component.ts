import { Component, OnInit, HostListener } from '@angular/core';
import { MapService } from '../service/map.service';
import { HttpStationService } from '../service/http-station.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private mapService: MapService, private httpStationService: HttpStationService) { }

  stations;
  startPoint="Punkt początkowy";
  endPoint="Punkt docelowy";

  ngOnInit() {
    this.getAllStation();
  }

  setStartPoint(station){
    this.startPoint="Z: "+station.stationName;
    this.mapService.setStart(station.x+","+station.y);
    this.mapService.setIntermediate(station.x+","+station.y);
  }


  setEndPoint(station){
    this.endPoint="Do: "+station.stationName;
    this.mapService.setEnd(station.x+","+station.y);
  }

  setType(types: string){

  }

  getAllStation(){
    this.httpStationService.getGetAllStation().subscribe(stations =>{
      this.stations = stations;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize($event) {
    this.mapService.changeHeight(document.getElementById("navbar").offsetHeight);
  }

}

export interface Station{
  id?: number;
  stationName?: string;
  x?: string;
  y?: string;
}
