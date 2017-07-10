import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AuthMenuComponent } from './auth-menu/auth-menu.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { UserComponent } from './user/user.component';
import { AuthService } from './auth.service';
import { AuthenticateGuard } from './authenticate.guard';

const routes: Routes = [
  { path: 'authenticate', component: AuthFormComponent },
  { path: 'cabinet', component: UserComponent, canActivate: [AuthenticateGuard] }
];

@NgModule({
  declarations: [AuthMenuComponent, AuthFormComponent, UserComponent],
  exports: [AuthMenuComponent, AuthFormComponent, UserComponent, RouterModule],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  providers: [AuthService, AuthenticateGuard]
})
export class AuthModule { }
