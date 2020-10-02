import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SingInComponent } from './sing-in/sing-in.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SingInComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    ReactiveFormsModule
  ]
})
export class SignInModule { }
