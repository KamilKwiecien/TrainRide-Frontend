import { AuthService } from './../service/auth.service';

import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.html',
  styleUrls: ['./user-delete.css']

})



export class UserDeleteComponent {
  logged;
  userInfo;
  rola: string;

  formPassword: string;



  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.subcribeVariable();
  }
  delete() {

    this.formPassword = (document.getElementById('formPassword') as HTMLInputElement).value;
    console.log(this.formPassword);
    this.authService.deleteUser(this.formPassword);
  }
  wyswietl(){
    console.log('cos');
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
