import { NgModule } from '@angular/core';
import { CommonModule as CModule } from '@angular/common';

import { ProductCartPipe } from './product-cart.pipe';
import { HoverDirective } from './hover.directive';
import { StorageService } from './storage.service';
import { InfoService } from './info.service';
import { KeyGenService } from './key-gen.service';

@NgModule({
  declarations: [HoverDirective, ProductCartPipe],
  imports: [CModule],
  providers: [StorageService, InfoService, KeyGenService],
  exports: [HoverDirective, ProductCartPipe]
})
export class CommonModule { }
