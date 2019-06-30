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
import { StationEditComponent} from './station-edit/station-edit';
import { StationDeleteComponent } from './station-delete/station-delete';
import {ConnAddComponent} from './conn-add/conn-add';
import {ConnEditComponent} from './conn-edit/conn-edit';
import {ConnDeleteComponent} from './conn-delete/conn-delete';
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
    path: 'editStation',
    component: StationEditComponent
  },
  {
    path: 'deleteStation',
    component: StationDeleteComponent
  },
 {
    path: 'editConn',
    component: ConnEditComponent
  },
  {
    path: 'addConn',
    component: ConnAddComponent
  },
  {
    path: 'deleteConn',
    component: ConnDeleteComponent
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
