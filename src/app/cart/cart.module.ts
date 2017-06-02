import { NgModule } from '@angular/core';
import { CommonModule as CModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from 'app/common';

import { CartListComponent, CartDetailComponent } from './';
import { CartCheckoutComponent } from './cart-checkout/cart-checkout.component';

const routes: Routes = [
  {
    path: 'cart',
    children: [
      { path: '', component: CartListComponent, pathMatch: 'full' },
      { path: 'detail', component: CartDetailComponent },
      { path: 'checkout', component: CartCheckoutComponent }
    ]
  }
];

@NgModule({
  declarations: [CartListComponent, CartDetailComponent, CartCheckoutComponent],
  exports: [CartListComponent, CartDetailComponent, CartCheckoutComponent, RouterModule],
  imports: [
    RouterModule.forChild(routes),
    CModule,
    CommonModule
  ],
})
export class CartModule { }
