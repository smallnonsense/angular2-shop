import { NgModule } from '@angular/core';
import { CommonModule as CModule } from '@angular/common';

import { CommonModule } from 'app/common/common.module';

import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [ProductListComponent],
  exports: [ProductListComponent],
  imports: [CModule, CommonModule]
})
export class ProductModule { }
