import { RouteService } from './../service/route.service';
import { Component, OnInit, ViewChild, ElementRef, HostListener, Input } from '@angular/core';
import { MapService } from '../service/map.service';

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private platform: any;
  private map: any;
  private router: any;

  private start: any;
  private intermediate: any;
  private intermediate2: any;
  private finish: any;
  private directions;


  @ViewChild('map')
  public mapElement: ElementRef;

  public constructor(private mapService: MapService, private routeService: RouteService) {

  }

  ngOnInit() {
    this.routeService.getS().subscribe(s => {
      this.start = s;
      this.route(this.start, this.finish);
    });
    this.routeService.getI().subscribe(i => {
      this.intermediate = i;
      this.route(this.start, this.finish);
    });
    this.routeService.getI2().subscribe(i => {
      this.intermediate2 = i;
      this.route(this.start, this.finish);
    });
    this.routeService.getE().subscribe(e => {
      this.finish = e;
      this.route(this.start, this.finish);
    });

    this.platform = new H.service.Platform({
      app_id: 'Heig9NXnzYM8aUktkoEv',
      app_code: 'SDGfAwWTLv-r3PnRKfTPxQ'
    });
    this.directions = [];
    this.router = this.platform.getRoutingService();
  }

  public ngAfterViewInit() {
    const defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 6,
        center: { lat: 51.949748, lng: 19.964191 },
        w: 10,
        h: 10
      }
    );

    this.route(this.start, this.finish);
  }


  public route(start: any, finish: any) {
    const params = {
      mode: 'fastest;car',
      waypoint0: 'geo!' + this.start,
      waypoint1: 'geo!' + this.intermediate,
      waypoint2: 'geo!' + this.intermediate2,
      waypoint3: 'geo!' + this.finish,
      representation: 'display'
    }
    this.map.removeObjects(this.map.getObjects());
    this.router.calculateRoute(params, data => {
      if (data.response) {
        this.directions = data.response.route[0].leg[0].maneuver;
        data = data.response.route[0];
        const lineString = new H.geo.LineString();
        data.shape.forEach(point => {
          const parts = point.split(',');
          lineString.pushLatLngAlt(parts[0], parts[1]);
        });
        const routeLine = new H.map.Polyline(lineString, {
          style: { strokeColor: 'blue', lineWidth: 5 }
        });
        const startMarker = new H.map.Marker({
          lat: this.start.split(',')[0],
          lng: this.start.split(',')[1]
        });
        const intermediateMarker = new H.map.Marker({
          lat: this.intermediate.split(',')[0],
          lng: this.intermediate.split(',')[1]
        });
        const intermediateMarker2 = new H.map.Marker({
          lat: this.intermediate2.split(',')[0],
          lng: this.intermediate2.split(',')[1]
        });
        const finishMarker = new H.map.Marker({
          lat: this.finish.split(',')[0],
          lng: this.finish.split(',')[1]
        });
        this.map.addObjects([routeLine, startMarker, intermediateMarker, intermediateMarker2, finishMarker]);
        //this.map.setViewBounds(routeLine.getBounds());
      }
    }, error => {
      console.error(error);
    });
  }

  mapSize() {
    const styles = {
      width: this.mapService.getWidth() + 'px',
      height: this.mapService.getHeight() + 'px',
    };
    return styles;
  }

  @HostListener('window:resize', ['$event'])
  onResize($event) {
    this.mapService.resize();
    this.map.width = this.mapService.getWidth();
    this.map.height = this.mapService.getHeight();
    this.map.getViewPort().resize();
  }

}
