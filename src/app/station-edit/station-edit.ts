import { AuthService } from './../service/auth.service';
import { StationService } from './../service/station.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-station-edit',
  templateUrl: './station-edit.html',
  styleUrls: ['./station-edit.css']

})



export class StationEditComponent {
  logged;
  userInfo;
  rola: string;

  formStationName: string;
  formX: string;
  formY: string;

  constructor(private authService: AuthService, private stationService: StationService) {
  }

  ngOnInit() {
    this.subcribeVariable();
  }
  private editStation() {
    this.formStationName = (document.getElementById('stationName') as HTMLInputElement).value;
    this.formX = (document.getElementById('x') as HTMLInputElement).value;
    this.formY = (document.getElementById('y') as HTMLInputElement).value;
    this.stationService.editStation(this.formStationName, this.formX, this.formY);
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
