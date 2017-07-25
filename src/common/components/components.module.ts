import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'page/not/fount', component: PageNotFountComponent }
];

@NgModule({
  declarations: [HomeComponent, MenuComponent, PageNotFountComponent],
  exports: [MenuComponent, RouterModule],
  imports: [CommonModule, RouterModule.forChild(routes)
  ],
})
export class ComponentsModule { }
