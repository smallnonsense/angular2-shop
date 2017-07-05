import { NgModule } from '@angular/core';
import { CommonModule as CModule } from '@angular/common';

import {
  HoverDirective, HighlightClickDirective,
  StorageService, InfoService
} from './';

@NgModule({
  declarations: [HoverDirective, HighlightClickDirective],
  imports: [CModule],
  providers: [StorageService, InfoService],
  exports: [HoverDirective, HighlightClickDirective]
})
export class CommonModule { }
