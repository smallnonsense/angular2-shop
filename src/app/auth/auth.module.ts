import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthDetailComponent } from './auth-detail/auth-detail.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { UserComponent } from './user/user.component';
import { AuthService } from './auth.service';

const routes: Routes = [
  { path: 'authenticate', component: AuthFormComponent },
  { path: 'cabinet', component: UserComponent }
];

@NgModule({
  declarations: [AuthDetailComponent, AuthFormComponent, UserComponent],
  exports: [AuthDetailComponent, AuthFormComponent, UserComponent, RouterModule],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [AuthService]
})
export class AuthModule { }
