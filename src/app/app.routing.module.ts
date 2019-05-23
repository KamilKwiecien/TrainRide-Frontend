import { ExampleForWiktorComponent } from './example-for-wiktor/example-for-wiktor.component';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';

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
    path: 'example',
    component: ExampleForWiktorComponent
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
