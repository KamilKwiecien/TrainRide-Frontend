import { AuthService } from './../service/auth.service';
import { StationService } from './../service/station.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-station-delete',
  templateUrl: './station-delete.html',
  styleUrls: ['./station-delete.css']

})



export class StationDeleteComponent {
  logged;
  userInfo;
  rola: string;

  formStationName: string;

  constructor(private authService: AuthService, private stationService: StationService) {
  }

  ngOnInit() {
    this.subcribeVariable();
  }
  private deleteStation() {
    this.formStationName = (document.getElementById('stationName') as HTMLInputElement).value;
    this.stationService.deleteStation(this.formStationName);
  }
  private subcribeVariable() {
    this.authService.checkLogged();

    this.authService.getLogged().subscribe(value => {
      this.logged = value;
    });
    this.authService.getUserInfo().subscribe(value => {
      this.userInfo = value;
      for (const role of this.userInfo.roles) {
        if (role.name == 'admin') {
          this.rola = role.name;
        }


      }


    });

  }
}
