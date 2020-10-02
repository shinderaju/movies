import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MoviesComponent} from './movies/movies.component';
import {CreateMovieComponent} from './create-movie/create-movie.component';
import {UpdateMovieComponent} from './update-movie/update-movie.component';
import {AuthorizationGuard} from '../guards/authorization.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthorizationGuard],
    children: [
      { path: '', component: MoviesComponent},
      { path: 'add-movie', component: CreateMovieComponent
        , data: {allowedRoles: ['admin']}
        },
      { path: 'update-movie', component: UpdateMovieComponent
        , data: {allowedRoles: ['admin']}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
