import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnreachableComponent } from './unreachable/unreachable.component';
import { DoActionComponent } from './do-action/do-action.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent, MenuComponent,
    UnreachableComponent, DoActionComponent],
  exports: [
    HomeComponent, MenuComponent,
    UnreachableComponent, DoActionComponent],
  imports: [CommonModule, RouterModule],
})
export class ComponentsModule { }
