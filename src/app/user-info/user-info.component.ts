import { PayService } from './../service/pay.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})

export class UserInfoComponent implements OnInit {
  wait;
  logged;
  userInfo;
  paymentInfo;
  rola: string;
  email: string;

  constructor(private authService: AuthService, private payService: PayService) {
  }

  ngOnInit() {
    this.subcribeVariable();
  }

  buy(email: string) {
    this.wait = 'Czekaj na przekierowanie na stronę płatności.';
    this.payService.pay(email);
  }
  deleteUser() {
    window.location.replace('deleteUser');
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

    this.authService.getPaymentInfo().subscribe(value => {
      this.paymentInfo = value;
    });
  }

}
