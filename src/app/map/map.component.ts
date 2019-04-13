import { MapSizeService } from './../service/map-size.service';
import { Component, OnInit, ViewChild, ElementRef, HostListener, Input } from '@angular/core';

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
  private finish: any;
  private directions;

  @ViewChild('map')
  public mapElement: ElementRef;

  public constructor(private mapSizeService: MapSizeService) {
    this.start = '50.0393593,19.9754854';
    this.finish = '50.8747647,20.6176709';
  }

  public ngOnInit() {
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
        zoom: 7,
        center: { lat: 50.4570620, lng: 20.2965781 },
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
      waypoint1: 'geo!' + this.finish,
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
        const finishMarker = new H.map.Marker({
          lat: this.finish.split(',')[0],
          lng: this.finish.split(',')[1]
        });
        this.map.addObjects([routeLine, startMarker, finishMarker]);
        //this.map.setViewBounds(routeLine.getBounds());
      }
    }, error => {
      console.error(error);
    });
  }

  mapSize() {
    const styles = {
      width: this.mapSizeService.getWidth() + 'px',
      height: this.mapSizeService.getHeight() + 'px',
    };
    return styles;
  }

  @HostListener('window:resize', ['$event'])
  onResize($event) {
    this.mapSizeService.resize();
    this.map.width = this.mapSizeService.getWidth();
    this.map.height = this.mapSizeService.getHeight();
    this.map.getViewPort().resize();
  }

}
