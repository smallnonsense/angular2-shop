import { NgModule } from '@angular/core';
import { CommonModule as CModule } from '@angular/common';

import {
  StorageService, InfoService, UrlService
} from './';

@NgModule({
  declarations: [],
  imports: [CModule],
  providers: [StorageService, InfoService, UrlService],
  exports: []
})
export class CommonModule { }
