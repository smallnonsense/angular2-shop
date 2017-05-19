import { NgModule } from '@angular/core';
import { CommonModule as CModule } from '@angular/common';

import {
  ProductCartPipe, HoverDirective, HighlightClickDirective,
  StorageService, InfoService, KeyGenService, KeygenLength
} from './';

@NgModule({
  declarations: [HoverDirective, HighlightClickDirective, ProductCartPipe],
  imports: [CModule],
  providers: [
    StorageService, InfoService, KeyGenService,
    { provide: KeygenLength, useValue: 5 }
  ],
  exports: [HoverDirective, HighlightClickDirective, ProductCartPipe]
})
export class CommonModule { }
