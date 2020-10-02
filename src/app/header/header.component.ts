import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../service/authorization.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;
  constructor(private authorizationService: AuthorizationService, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.loginLogoutEvent.subscribe((value) => {
      this.loggedIn = this.authorizationService.isAuthenticated();
    });
  }
  logout() {
    this.apiService.logout().subscribe((response) => {
      console.log('response', response);
    });
  }

}
