import { NgModule } from '@angular/core';
import { CommonModule as CModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from 'app/common/common.module';

import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: 'products',
    children: [
      { path: '', component: ProductListComponent, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [ProductListComponent],
  exports: [ProductListComponent, RouterModule],
  imports: [
    CModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
