import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { BasketCachingService } from './basket-caching.service';
import { BasketService } from './basket.service';
import { InfoService } from './info.service';
import { StorageService } from './storage.service';
import { ProductService } from './product.service';
import { UrlService } from './url.service';

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
