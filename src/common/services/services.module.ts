import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthService } from './auth.service';
import { BasketCachingService } from './basket-caching.service';
import { BasketService } from './basket.service';
import { InfoService } from './info.service';
import { RouteService } from './route.service';
import { StorageService } from './storage.service';
import { ProductService } from './product.service';
import { UrlService } from './url.service';
import { MenuService } from './menu.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    RouteService, StorageService, InfoService, UrlService, ProductService,
    AuthService, BasketService, BasketCachingService, MenuService
  ],
  exports: []
})
export class ServicesModule { }
