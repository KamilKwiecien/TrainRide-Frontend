import { AuthService } from './../service/auth.service';
import { StationService } from './../service/station.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-conn-edit',
  templateUrl: './conn-edit.html',
  styleUrls: ['./conn-edit.css']

})



export class ConnEditComponent {
  logged;
  userInfo;
  rola: string;

  formSourceStation: string;
  formDestinationStation: string;
  formDistance: string;
  formTravelTime: string;
  formCost: string;

  constructor(private authService: AuthService, private stationService: StationService) {
  }

  ngOnInit() {
    this.subcribeVariable();
  }
  private editConn() {
    this.formSourceStation = (document.getElementById('formSourceStation') as HTMLInputElement).value;
    this.formDestinationStation = (document.getElementById('formDestinationStation') as HTMLInputElement).value;
    this.formDistance = (document.getElementById('formDistance') as HTMLInputElement).value;
    this.formTravelTime = (document.getElementById('formTravelTime') as HTMLInputElement).value;
    this.formCost = (document.getElementById('formCost') as HTMLInputElement).value;
    this.stationService.editConn(this.formSourceStation, this.formDestinationStation, this.formDistance, this.formTravelTime, this.formCost);
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
