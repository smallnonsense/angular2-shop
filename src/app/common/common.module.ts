import { NgModule } from '@angular/core';
import { CommonModule as CModule } from '@angular/common';

import { ProductCartPipe } from './product-cart.pipe';
import { HoverDirective } from './hover.directive';
import { StorageService } from './storage.service';
import { InfoService } from './info.service';
import { KeyGenService, KeygenLength } from './key-gen.service';
import { HighlightClickDirective } from './highlight-click.directive';

@NgModule({
  declarations: [HoverDirective, HighlightClickDirective, ProductCartPipe],
  imports: [CModule],
  providers: [
    StorageService, InfoService, KeyGenService
    , { provide: KeygenLength, useValue: 5 }
  ],
  exports: [HoverDirective, HighlightClickDirective, ProductCartPipe]
})
export class CommonModule { }
