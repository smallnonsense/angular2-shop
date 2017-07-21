import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';

import { AuthModule } from 'app/auth';
import { CommonModule } from 'app/common';

import { BasketService, BasketCachingService } from './';

@NgModule({
  declarations: [],
  exports: [],
  imports: [NgCommonModule, CommonModule, AuthModule],
  providers: [BasketService, BasketCachingService]
})
export class CartCommonModule { }
