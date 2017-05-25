import { NgModule } from '@angular/core';
import { CommonModule as CModule } from '@angular/common';

import { CommonModule } from 'app/common';

import { CartListComponent, CartDetailComponent } from './';

@NgModule({
  declarations: [CartListComponent, CartDetailComponent],
  exports: [CartListComponent, CartDetailComponent],
  imports: [CModule, CommonModule],
})
export class CartModule { }
