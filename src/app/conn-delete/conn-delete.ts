import { AuthService } from './../service/auth.service';
import { StationService } from './../service/station.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-conn-delete',
  templateUrl: './conn-delete.html',
  styleUrls: ['./conn-delete.css']

})



export class ConnDeleteComponent {
  logged;
  userInfo;
  rola: string;

  formSourceStation: string;
  formDestinationStation: string;


  constructor(private authService: AuthService, private stationService: StationService) {
  }

  ngOnInit() {
    this.subcribeVariable();
  }
  private deleteConn() {
    this.formSourceStation = (document.getElementById('formSourceStation') as HTMLInputElement).value;
    this.formDestinationStation = (document.getElementById('formDestinationStation') as HTMLInputElement).value;
    this.stationService.deleteConn(this.formSourceStation, this.formDestinationStation);
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
