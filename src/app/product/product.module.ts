import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from 'app/common';

import { ProductService, ProductListComponent } from './';

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
    NgCommonModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [ProductService]
})
export class ProductModule { }
