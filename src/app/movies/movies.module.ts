import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { UpdateMovieComponent } from './update-movie/update-movie.component';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {MoviesComponent} from './movies/movies.component';
import {MoviesService} from './movies.service';

@NgModule({
  declarations: [UpdateMovieComponent, CreateMovieComponent, MoviesComponent],
    imports: [
        CommonModule,
        MoviesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgMultiSelectDropDownModule,
    ],
  providers: [
    MoviesService
  ]
})
export class MoviesModule { }
