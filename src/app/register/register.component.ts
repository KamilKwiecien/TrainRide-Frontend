import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {getValue} from '@angular/core/src/render3/styling/class_and_style_bindings';
import {el} from '@angular/platform-browser/testing/src/browser_util';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit {
  formEmail: any;
  formPassword: any;
  formUsername: any;
  formPassword2: any;
  constructor() { }

  ngOnInit() {

  }

  register() {


    this.formEmail = (document.getElementById('email') as HTMLInputElement).value;
    this.formUsername = (document.getElementById('username') as HTMLInputElement).value;
    this.formPassword = (document.getElementById('password') as HTMLInputElement).value;
    this.formPassword2 = (document.getElementById('password2') as HTMLInputElement).value;
    if (this.formUsername == null || this.formUsername === "" || this.formEmail == null ||  this.formEmail === "" ||this.formPassword2 == null || this.formPassword2 == "" || this.formPassword == null || this.formPassword2 == "") {
      window.alert('Nie podano wszystkich danych');
    } else {
      if (this.formPassword !== this.formPassword2) {
        window.alert('Hasła się różnią');
      } else {
        window.alert('Wszystko okej');
      }
    }


  }
}
