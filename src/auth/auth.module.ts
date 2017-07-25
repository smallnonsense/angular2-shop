import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import {
  AuthMenuComponent, AuthFormComponent,
  UserComponent, AuthenticateGuard, UnauthorizedComponent
} from './';

const routes: Routes = [
  { path: 'authenticate', component: AuthFormComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'cabinet', component: UserComponent,
    canActivate: [AuthenticateGuard]
  }
];

@NgModule({
  declarations: [
    AuthMenuComponent, AuthFormComponent,
    UnauthorizedComponent, UserComponent],
  exports: [AuthMenuComponent, RouterModule],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  providers: [AuthenticateGuard]
})
export class AuthModule { }
