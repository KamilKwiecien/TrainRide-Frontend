import { MapSizeService } from './../service/map-size.service';
import { Component, OnInit, ViewChild, ElementRef, HostListener, Input } from '@angular/core';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private platform: any;
  private map: any;

  @ViewChild("map")
  public mapElement: ElementRef;

  public constructor(private mapSizeService: MapSizeService) {
    this.platform = new H.service.Platform({
      "app_id": "Heig9NXnzYM8aUktkoEv",
      "app_code": "SDGfAwWTLv-r3PnRKfTPxQ"
    });
  }

  public ngOnInit() { }

  public ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 14,
        center: { lat: 50.8740, lng: 20.6252 },
        w: 10,
        h: 10
      }
    );
  }

  mapSize() {
    let styles = {
      'width': this.mapSizeService.getWidth() + "px",
      'height': this.mapSizeService.getHeight() + "px",
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
