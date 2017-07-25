import { NgModule } from '@angular/core';

import {
  StorageService, InfoService, UrlService, ProductService,
    AuthService, BasketService, BasketCachingService
} from './';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    StorageService, InfoService, UrlService, ProductService,
    AuthService, BasketService, BasketCachingService
  ],
  exports: []
})
export class ServicesModule { }
