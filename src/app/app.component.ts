import { Component } from '@angular/core';
import {ApiService} from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-stack-crud-app';
  showLoader = false;
  constructor(private apiService: ApiService) {
    this.apiService.showLoader.subscribe(value => {
      this.showLoader = value;
    });
  }
}
