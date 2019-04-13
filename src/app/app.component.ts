import { MapSizeService } from './service/map-size.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MapSizeService]
})
export class AppComponent {
  title = 'TrainRide';
}
