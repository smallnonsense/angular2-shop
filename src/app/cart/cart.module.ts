import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './cart-list/cart-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CartListComponent
  ],
  declarations: [
    CartListComponent
  ]
})
export class CartModule { }
