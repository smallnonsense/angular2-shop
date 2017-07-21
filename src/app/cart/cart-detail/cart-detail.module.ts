import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthModule } from 'app/auth';
// import { CommonModule } from 'app/common';
import { CartCommonModule } from 'app/cart/cart-common';

import { CartGuard } from './';
import { CartDetailComponent } from './cart-detail.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [CartGuard],
    canActivateChild: [CartGuard],
    children: [
      {
        path: '', pathMatch: 'full',
        loadChildren: 'app/cart/cart-list/cart-list.module#CartListModule'
      },
      {
        path: 'detail', component: CartDetailComponent
      },
      {
        path: 'checkout',
        loadChildren: 'app/cart/cart-checkout/cart-checkout.module#CartCheckoutModule'
      }
    ]
  }
];

@NgModule({
  declarations: [CartDetailComponent],
  exports: [CartDetailComponent, RouterModule],
  imports: [NgCommonModule, CartCommonModule, AuthModule, RouterModule.forChild(routes)],
  providers: [CartGuard]
})
export class CartDetailModule { }
