import { NgModule } from '@angular/core';
import { CommonModule as CModule } from '@angular/common';

import { ProductCartPipe } from './product-cart.pipe';
import { HoverDirective } from './hover.directive';

@NgModule({
  declarations: [HoverDirective, ProductCartPipe],
  imports: [CModule],
  providers: [],
  exports: [HoverDirective, ProductCartPipe]
})
export class CommonModule { }
