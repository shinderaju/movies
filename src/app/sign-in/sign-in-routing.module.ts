import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SingInComponent} from './sing-in/sing-in.component';

const routes: Routes = [{ path: '', component: SingInComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInRoutingModule { }
