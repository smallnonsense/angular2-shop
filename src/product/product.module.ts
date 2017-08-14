import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './';

const routes: Routes = [
  {
    path: 'products', component: ProductListComponent,
    data: { title: 'Products' }
  }
];

@NgModule({
  declarations: [ProductListComponent],
  exports: [ProductListComponent, RouterModule],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class ProductModule { }
