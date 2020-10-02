import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { ApiService } from './service/api.service';
import { MoviesComponent } from './movies/movies/movies.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { HeaderComponent } from './header/header.component';
import {TokenInterceptor} from './service/tokent.interceptor';
import {LocalstorageService} from './service/localstorage.service';
import {AuthorizationService} from './service/authorization.service';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeCreateComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    HeaderComponent,
    LoaderComponent,
    // MoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule,
    FormsModule
  ],
  providers: [ApiService, AuthorizationService, LocalstorageService, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  exports: [
    LoaderComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
