import { PayPalReturnComponent } from './pay-pal-return/pay-pal-return.component';
import { PayPalCancelComponent } from './pay-pal-cancel/pay-pal-cancel.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import {FBLoginComponent} from './fblogin/fblogin.component';
import { UserInfoComponent } from './user-info/user-info.component';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserInfoComponent
  },
  {
    path: 'payPalCancel',
    component: PayPalCancelComponent
  },
  {
    path: 'payPalReturn',
    component: PayPalReturnComponent
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
