import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, Router, RouterModule } from '@angular/router';

import { UserClaim } from 'common/models';

import { AuthMenuComponent } from './auth-menu/auth-menu.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { UserComponent } from './user/user.component';
import { AuthorizeGuard } from './authorize.guard';

const routes: Routes = [
  {
    path: 'authenticate', component: AuthFormComponent,
    data: { requred: UserClaim.none }
  },
  {
    path: 'unauthorized', component: UnauthorizedComponent,
    data: { requred: UserClaim.none }
  },
  {
    path: 'cabinet', component: UserComponent,
    canActivate: [AuthorizeGuard], data: { requred: UserClaim.known }
  }
];

@NgModule({
  declarations: [
    AuthMenuComponent, AuthFormComponent,
    UnauthorizedComponent, UserComponent
  ],
  exports: [AuthMenuComponent, RouterModule],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  providers: [AuthorizeGuard]
})
export class AuthModule { }
