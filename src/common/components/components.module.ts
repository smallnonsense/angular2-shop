import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserClaim } from 'common/models';

import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent, MenuComponent, PageNotFountComponent],
  exports: [HomeComponent, MenuComponent, PageNotFountComponent],
  imports: [CommonModule, RouterModule],
})
export class ComponentsModule { }
