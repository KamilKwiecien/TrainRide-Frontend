import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent{

  title = 'Logowanie przez Facebook!';
  user: any;

  constructor(private socioAuthServ: AuthService) { }

 // Method to sign in with facebook.
 signIn(socialPlatform: string): void {
  let socialPlatformProvider;
  if (socialPlatform == 'Facebook') {
    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  }
  this.socioAuthServ.signIn(socialPlatformProvider).then(
    (response) => {
      console.log(socialPlatform + ' logged in user data is= ', response);
      this.user = response;
    }
  );
}

// Method to log out.
signOut(): void {
  this.socioAuthServ.signOut();
  this.user = null;
  console.log('User signed out.');
}

}
