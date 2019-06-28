import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Http} from '@angular/http';
import {LoginResponse} from '../service/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})



export class RegisterComponent implements OnInit {
  formEmail: string;
  formPassword: string;
  formUsername: string;
  formPassword2: string;


  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  register() {


    this.formEmail = (document.getElementById('email') as HTMLInputElement).value;
    this.formUsername = (document.getElementById('username') as HTMLInputElement).value;
    this.formPassword = (document.getElementById('password') as HTMLInputElement).value;
    this.formPassword2 = (document.getElementById('password2') as HTMLInputElement).value;
    if (this.formUsername == null || this.formUsername === "" || this.formEmail == null ||  this.formEmail === "" || this.formPassword2 == null || this.formPassword2 == "" || this.formPassword == null || this.formPassword2 == "") {
      window.alert('Nie podano wszystkich danych');
    } else {
      if (this.formPassword !== this.formPassword2) {
        window.alert('Hasła się różnią');
      } else {
        window.alert('OKEJ ');

        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        const create: Create = ({
          email: this.formEmail,
          password: this.formPassword,
          username: this.formUsername
        });

        this.http.post<CreateResponse>('http://localhost:8080/trainRide/register', create, { headers: headers , observe: "response", withCredentials: true }).subscribe(post => {
          localStorage.window(post.body.msg);
        });
      }

    }


  }
}
export class Create {
  email?: string;
  password?: string;
  username?: string;
}
export interface CreateResponse {
  cookie?: string;
  msg?: string;
  result?: string;
}
