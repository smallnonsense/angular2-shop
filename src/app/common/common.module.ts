import { NgModule } from '@angular/core';
import { CommonModule as CModule } from '@angular/common';

import {
  HoverDirective, HighlightClickDirective,
  StorageService, InfoService, UrlService
} from './';

@NgModule({
  declarations: [HoverDirective, HighlightClickDirective],
  imports: [CModule],
  providers: [StorageService, InfoService, UrlService],
  exports: [HoverDirective, HighlightClickDirective]
})
export class CommonModule { }
