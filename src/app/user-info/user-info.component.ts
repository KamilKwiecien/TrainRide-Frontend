import { AuthService} from './../service/auth.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})

export class UserInfoComponent implements OnInit {

  logged;
  userInfo;
  paymentInfo;
  desc: string;
  rola: string;
  email = 'testowy mail';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {

    this.subcribeVariable();


    console.log(this.desc);


  }

  private subcribeVariable() {
    this.authService.checkLogged();

    this.authService.getLogged().subscribe(value => {
      this.logged = value;
    });
    this.authService.getUserInfo().subscribe(value => {
      this.userInfo = value;

      this.email = this.userInfo.email;
      for (const role of this.userInfo.roles) {
        this.rola = role.name;

      }

      this.subscribePayments(this.userInfo.email);
    });

  }

  public subscribePayments(email: string) {

    this.authService.checkPayment(email);

    this.authService.getPaymentAll().subscribe(value1 => {
  this.paymentInfo = value1;


  this.desc = value1.description;

});
  }

}
