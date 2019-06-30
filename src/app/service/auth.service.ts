import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {ConnInfo} from './station.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged = new Subject<boolean>();
  loggedError = new Subject<string>();
  paymentInfo = new Subject<PaymentRespone>();
  userInfo = new Subject<UserInfo>();



  constructor(private http: HttpClient, private router: Router) { }


  checkLogged() {
    if (localStorage.getItem('session_cookie')) {
      const headers = new HttpHeaders().set('Cookie', 'JSESSIONID=' + localStorage.getItem('session_cookie'));
      this.http.get<UserInfo>('http://localhost:8080/trainRide/user/logged', { headers, withCredentials: true }).subscribe(get => {
        if (get) {
          this.logged.next(true);
          this.userInfo.next(get);
        } else {
          this.logged.next(false);
        }
      });
    } else {
      this.logged.next(false);
    }
  }

  checkPayment(email: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const res: Res = ({
      email,
    });

    this.http.post('http://localhost:8080/trainRide/payment/user', res, { headers, observe: 'response', withCredentials: true })
      .subscribe(post => {
        this.paymentInfo.next(post.body[0]);
      });
  }
  deleteUser(password: string)
  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const rem: UserInfo2 = ({
      password

    });
    this.http.post('http://localhost:8080/trainRide/user/deleteMe', rem, { headers,  withCredentials: true }).subscribe(post => {
      window.alert('Usunięto');
      window.location.replace('http://localhost:4200/user');
    });
  }
  login(email: string, password: string, fbLogin: boolean) {
    this.loggedError.next('');
    localStorage.removeItem('session_cookie');
    this.http.get('http://localhost:8080/trainRide/logout', { withCredentials: true }).subscribe(get => {
    });
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const login: Login = ({
      email,
      password,
      fbLogin
    });
    this.http.post<LoginResponse>('http://localhost:8080/trainRide/login', login, { headers, observe: 'response', withCredentials: true }).subscribe(post => {

      if (post.body.msg == 'zalogowano') {
        localStorage.setItem('session_cookie', post.body.cookie);
        this.checkLogged();
      } else {
        localStorage.removeItem('session_cookie');
        this.checkLogged();
      }
      if (!post.body.result) {
        this.loggedError.next('Niepoprawne dane logowania');
      }
    },
      error => {
        console.log(error.error.message);
        localStorage.removeItem('session_cookie');
        this.checkLogged();
      });
  }

  register(email: string, password: string, userName: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const register: Register = ({
      email,
      password,
      userName
    });
    this.http.post<LoginResponse>('http://localhost:8080/trainRide/user/register', register, { headers, observe: 'response', withCredentials: true }).subscribe(post => {
      window.alert('Zarejestrowano');
      window.location.replace('http://localhost:4200/home');
    });
  }

  logout() {
    this.http.get('http://localhost:8080/trainRide/logout', { withCredentials: true }).subscribe(get => {
      this.router.navigateByUrl('/home');
    });
    this.checkLogged();
    window.location.reload();
  }

  getLogged(): Observable<boolean> {
    return this.logged.asObservable();
  }

  getLoggedError(): Observable<string> {
    return this.loggedError.asObservable();
  }

  getUserInfo(): Observable<UserInfo> {
    return this.userInfo.asObservable();
  }

  getPaymentInfo(): Observable<PaymentRespone> {
    return this.paymentInfo.asObservable();
  }
}



export interface Login {
  email?: string;
  password?: string;
  fbLogin?: boolean;
}

export interface Register {
  email?: string;
  password?: string;
  userName?: string;
}

export interface LoginResponse {
  cookie?: string;
  msg?: string;
  result?: string;
}

export interface UserInfo {
  email?: string;
  user_name?: string;
  roles?: Array<UserRole>;
}
export interface UserInfo2 {
  password?: string;
}
export interface UserRole {
  name: string;
}

export interface Res {
  email: string;
}

export interface PaymentRespone {
  createTime?:string;
  currency?:string;
  description?:string;
  email?:string;
  id?:number;
  paymentID?:string;
  paymentTime?:string;
  status?:string;
  totalAmount?:string;
}
