import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(private http: HttpClient, private router: Router) { }

  pay(email: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const pay: Pay = ({
      email: email
    });
    this.http.post<PayRespone>('http://localhost:8080/trainRide/payment/invoke', pay, { headers, observe: 'response', withCredentials: true }).subscribe(post => {
      console.log(post);
      localStorage.setItem('paymentID', post.body.paymentID);
      window.location.href = post.body.link;
    });
  }

  paySuccessfully(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const pay: Pay = ({
      paymentID: localStorage.getItem('paymentID')
    });
    this.http.post<PayRespone>('http://localhost:8080/trainRide/payment/paid', pay, { headers, observe: 'response', withCredentials: true }).subscribe(post => {
      localStorage.removeItem('paymentID');
      this.router.navigateByUrl('/user');
    });
  }
}

export interface Pay {
  email?: string;
  paymentID?: string;
}

export interface PayRespone{
  link:string;
  paymentID;string;
}
