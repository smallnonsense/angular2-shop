import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';

import { StorageService, InfoService, UrlService } from './';

@NgModule({
  declarations: [],
  imports: [NgCommonModule],
  providers: [StorageService, InfoService, UrlService],
  exports: []
})
export class CommonModule { }
