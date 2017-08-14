import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, Router, RouterModule } from '@angular/router';

import { AuthMenuComponent } from './auth-menu/auth-menu.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'authenticate', component: AuthFormComponent,
    data: { required: 'none' }
  },
  {
    path: 'cabinet', component: UserComponent,
    data: { required: 'known' }
  }
];

@NgModule({
  declarations: [
    AuthMenuComponent, UserMenuComponent,
    AuthFormComponent, UserComponent
  ],
  exports: [AuthMenuComponent, UserMenuComponent, RouterModule],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  providers: []
})
export class AuthModule { }
