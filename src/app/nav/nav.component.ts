import { MapService } from './../service/map.service';
import { Component, HostListener, OnInit } from '@angular/core';

import { HttpStationService } from '../service/http-station.service';
import { RouteService } from '../service/route.service';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private authService: AuthService, private routeService: RouteService, private mapService: MapService, private httpStationService: HttpStationService) { }

  stations;
  startPoint = "Punkt początkowy";
  endPoint = "Punkt docelowy";
  routeType = "Typ trasy";

  errorRoute;
  errorRouteMessage;

  changesCount;
  cost;
  distance;
  time;
  routeInfo;

  availablePremium = false;

  ngOnInit() {
    this.getAllStation();
    this.routeService.setWithChange(true);
    this.subcribeVariable();
    this.setType('shortest');
  }

  setStartPoint(station) {
    this.startPoint = "Z: " + station.stationName;
    this.routeService.setStart(station.stationName);
  }


  setEndPoint(station) {
    this.endPoint = "Do: " + station.stationName;
    this.routeService.setEnd(station.stationName);
  }

  setType(type: string) {
    if (type == 'shortest') {
      this.routeType = "Typ trasy: Najkrótsza";
    }
    if (type == 'fastest') {
      this.routeType = "Typ trasy: Najszybsza";
    }
    if (type == 'cheapest') {
      this.routeType = "Typ trasy: Najtańsza";
    }
    this.routeService.setType(type);
  }

  setWithChange(event) {
    this.routeService.setWithChange(event.path[0].checked);
  }

  getAllStation() {
    this.httpStationService.getGetAllStation().subscribe(stations => {
      this.stations = stations;
    });
  }


  private subcribeVariable() {
    this.routeService.changesCount.subscribe(value => {
      this.changesCount = value;
    });

    this.routeService.getCost().subscribe(value => {
      this.cost = value;
    });

    this.routeService.getDistance().subscribe(value => {
      this.distance = value;
    });

    this.routeService.getTime().subscribe(value => {
      this.time = value;
    });

    this.routeService.getError().subscribe(value => {
      this.errorRoute = value;
    });

    this.routeService.getErrorMessage().subscribe(value => {
      this.errorRouteMessage = value;
    });

    this.routeService.getStations().subscribe(value => {
      this.routeInfo = value;
    });

    this.authService.getUserInfo().subscribe(value => {
      for (var item of value.roles) {
        if(item.name=="userPremium"){
          this.availablePremium =true;
        }
      }
    });
    this.authService.checkLogged();
  }

  @HostListener('window:resize', ['$event'])
  onResize($event) {
    this.mapService.changeHeight(document.getElementById("navbar").offsetHeight);
  }

}

export interface Station {
  id?: number;
  stationName?: string;
  x?: string;
  y?: string;
}
