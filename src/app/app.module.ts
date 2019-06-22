import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';

import { MapComponent } from './map/map.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule, MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { UserLoginComponent } from './user-login/user-login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule} from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { FBLoginComponent } from './fblogin/fblogin.component';
import { EnteredComponent } from './entered/entered.component';
import { UserBarComponent } from './user-bar/user-bar.component';

let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("1166410650223493")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MapComponent,
    DatepickerComponent,
    UserLoginComponent,
    HomeComponent,
FBLoginComponent,
EnteredComponent,
UserBarComponent,

  ],
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    SocialLoginModule,
  ],
  providers: [
    MatFormFieldModule,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

