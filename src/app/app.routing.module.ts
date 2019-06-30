import { PayPalReturnComponent } from './pay-pal-return/pay-pal-return.component';
import { PayPalCancelComponent } from './pay-pal-cancel/pay-pal-cancel.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import {FBLoginComponent} from './fblogin/fblogin.component';
import { UserInfoComponent } from './user-info/user-info.component';
import {RegisterComponent} from './register/register.component';
import {AdminInfoComponent} from './admin-info/admin-info.component';
import { StationAddComponent} from './station-add/station-add';


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
    path: 'admin',
    component: AdminInfoComponent
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
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'addStation',
    component: StationAddComponent
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
