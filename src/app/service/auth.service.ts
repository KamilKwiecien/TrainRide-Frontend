import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged = new Subject<boolean>();
  loggedError = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) { }


  checkLogged() {
    if (localStorage.getItem('session_cookie')) {
      let headers = new HttpHeaders().set('Cookie', 'JSESSIONID=' + localStorage.getItem('session_cookie'));
      this.http.get('http://localhost:8080/trainRide/user/logged', { headers: headers, withCredentials: true }).subscribe(get => {
        if (get) {
          this.logged.next(true);
        } else {
          this.logged.next(false);
        }
      });
    } else {
      this.logged.next(false);
    }
  }

  login(email: string, password: string, fbLogin: boolean) {
    this.loggedError.next('');
    localStorage.removeItem('session_cookie');
    this.http.get('http://localhost:8080/trainRide/logout', { withCredentials: true }).subscribe(get => {
    });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const login: Login = ({
      email: email,
      password: password,
      fbLogin: fbLogin
    });
    this.http.post<LoginResponse>('http://localhost:8080/trainRide/login', login, { headers: headers, observe: "response", withCredentials: true }).subscribe(post => {

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

  logout() {
    this.http.get('http://localhost:8080/trainRide/logout', { withCredentials: true }).subscribe(get => {
    });
    this.checkLogged();
    this.router.navigateByUrl('/home');

  }

  getLogged(): Observable<boolean> {
    return this.logged.asObservable();
  }
  getLoggedError(): Observable<string> {
    return this.loggedError.asObservable();
  }
}



export interface Login {
  email?: string;
  password?: string;
  fbLogin?: boolean;
}

export interface LoginResponse {
  cookie?: string;
  msg?: string;
  result?: string;
}
