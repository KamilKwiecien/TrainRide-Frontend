import { MapService } from './../service/map.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent implements OnInit {

  constructor(private mapService: MapService, private authService: AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
  }

  ngAfterViewInit() {
    this.mapService.setHeight(document.getElementById("userBar").offsetHeight);
  }

}
