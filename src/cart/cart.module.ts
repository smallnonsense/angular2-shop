import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CartListComponent } from './cart-list/cart-list.component';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { CartCheckoutComponent } from './cart-checkout/cart-checkout.component';


const routes: Routes = [
  {
    path: 'cart', component: CartListComponent, pathMatch: 'full',
    data: { title: 'Cart' }
  },
  {
    path: 'cart/checkout', component: CartCheckoutComponent
  }
];

@NgModule({
  declarations: [CartDetailComponent, CartListComponent, CartCheckoutComponent],
  exports: [CartDetailComponent, RouterModule],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: []
})
export class CartModule { }
