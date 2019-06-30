import { PayService } from './../service/pay.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay-pal-return',
  templateUrl: './pay-pal-return.component.html',
  styleUrls: ['./pay-pal-return.component.css']
})
export class PayPalReturnComponent implements OnInit {

  constructor(private payService: PayService) { }

  ngOnInit() {
    this.payService.paySuccessfully();
  }

}
