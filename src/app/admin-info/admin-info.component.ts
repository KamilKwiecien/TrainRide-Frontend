import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
  styleUrls: ['./admin-info.component.css']
})

export class AdminInfoComponent implements OnInit {
  isAdmin;
  logged;
  userInfo;
  paymentInfo;
  rola: string;
  email: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.subcribeVariable();
  }

  private subcribeVariable() {
    this.authService.checkLogged();

    this.authService.getLogged().subscribe(value => {
      this.logged = value;
    });
    this.authService.getUserInfo().subscribe(value => {
      this.userInfo = value;
      for (const role of this.userInfo.roles) {
        if(role.name=='admin')
        {
          this.rola = role.name;
        }


      }



    });

  }


  addStation() {
    window.location.replace('addStation');
  }

  editStation() {
    window.location.replace('editStation');
  }
}
