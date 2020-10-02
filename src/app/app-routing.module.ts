import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { MoviesComponent} from './movies/movies/movies.component';

// @ts-ignore

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'movie' },
  // { path: 'create-employee', component: EmployeeCreateComponent },
  // { path: 'edit-employee/:id', component: EmployeeEditComponent },
  // { path: 'employees-list', component: EmployeeListComponent },
  // @ts-ignore
  { path: 'movie', loadChildren: () => import('./movies/movies.module').then(t => t.MoviesModule)},
  // @ts-ignore
  { path: 'sign-in', loadChildren: () => import('./sign-in/sign-in.module').then(t => t.SignInModule)},
  // @ts-ignore
  { path: 'sign-up', loadChildren: () => import('./sign-up/sign-up.module').then(t => t.SignUpModule)}
  // { path: '**', component: MoviesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
