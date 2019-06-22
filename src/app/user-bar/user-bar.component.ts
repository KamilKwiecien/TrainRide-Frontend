import { Login } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { AuthService as FbAuthService, FacebookLoginProvider } from 'angularx-social-login';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent {

  title = 'Logowanie przez Facebook!';
  user: any;

  formPassword;
  formEmail;

  constructor(private socioAuthServ: FbAuthService, private authService: AuthService) { }

  // Method to sign in with facebook.
  signIn(socialPlatform: string): void {
    let socialPlatformProvider;
    if (socialPlatform == 'Facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    this.socioAuthServ.signIn(socialPlatformProvider).then(
      (response) => {
        console.log(socialPlatform + ' logged in user data is= ', response);
        this.authService.login(response.email,"", true);
        this.user = response;
      }
    );
    this.authService.checkLogged();
  }


  login() {
    this.authService.login(this.formEmail, this.formPassword, false);
  }

  // Method to log out.
  signOut(): void {
    this.socioAuthServ.signOut();
    this.user = null;
    console.log('User signed out.');

  }
}
