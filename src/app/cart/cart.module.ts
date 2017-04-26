import { NgModule } from '@angular/core';
import { CommonModule as CModule } from '@angular/common';

import { CommonModule } from 'app/common/common.module';

import { CartListComponent } from './cart-list/cart-list.component';

@NgModule({
  declarations: [CartListComponent],
  exports: [CartListComponent],
  imports: [CModule, CommonModule],
})
export class CartModule { }
