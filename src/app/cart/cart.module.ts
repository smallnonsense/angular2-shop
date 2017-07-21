import { NgModule } from '@angular/core';
import { CommonModule as CModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from 'app/common';
import { AuthenticateGuard } from 'app/auth';

import {
  CartGuard, BasketService, BasketCachingService,
  CartListComponent, CartDetailComponent, CartCheckoutComponent
} from './';

const routes: Routes = [
  {
    path: 'cart',
    canActivate: [CartGuard],
    canActivateChild: [CartGuard],
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
  providers: [
    CartGuard,
    BasketService,
    BasketCachingService
  ]
})
export class CartModule { }
