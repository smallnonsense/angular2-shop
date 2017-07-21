import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthModule } from 'app/auth';
import { CartCommonModule } from 'app/cart/cart-common';
import { CommonModule } from 'app/common';

import { CartCheckoutComponent } from './';

@NgModule({
  declarations: [CartCheckoutComponent],
  exports: [],
  imports: [NgCommonModule, CommonModule, CartCommonModule, AuthModule],
  providers: []
})
export class CartCheckoutModule { }
