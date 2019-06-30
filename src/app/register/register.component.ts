import { AuthService } from './../service/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})



export class RegisterComponent{
  formEmail: string;
  formPassword: string;
  formUsername: string;
  formPassword2: string;

  constructor(private authService: AuthService) { }

  register() {
    this.formEmail = (document.getElementById('email') as HTMLInputElement).value;
    this.formUsername = (document.getElementById('userName') as HTMLInputElement).value;
    this.formPassword = (document.getElementById('password') as HTMLInputElement).value;
    this.formPassword2 = (document.getElementById('password2') as HTMLInputElement).value;
    if (this.formUsername == null || this.formUsername === "" || this.formEmail == null || this.formEmail === "" || this.formPassword2 == null || this.formPassword2 == "" || this.formPassword == null || this.formPassword2 == "") {
      window.alert('Nie podano wszystkich danych');
    } else {
      if (this.formPassword !== this.formPassword2) {
        window.alert('Hasła się różnią');
      } else {

        this.authService.register(this.formEmail, this.formPassword, this.formUsername);
      }
    }
  }
}
