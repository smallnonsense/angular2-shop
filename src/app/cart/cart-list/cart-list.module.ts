import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';

import { AuthModule } from 'app/auth';
import { CommonModule } from 'app/common';
import { CartCommonModule } from 'app/cart/cart-common';

import { CartListComponent } from './cart-list.component';

@NgModule({
  declarations: [CartListComponent],
  exports: [],
  imports: [NgCommonModule, CommonModule, CartCommonModule, AuthModule],
  providers: []
})
export class CartListModule { }
