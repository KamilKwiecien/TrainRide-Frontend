import { AuthService, UserInfo } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  logged;
  userInfo;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subcribeVariable();
  }

  private subcribeVariable() {
    this.authService.checkLogged();
    this.authService.getLogged().subscribe(value => {
      this.logged = value;
    });

    this.authService.getUserInfo().subscribe(value =>{
      this.userInfo = value;
    });
  }

}
