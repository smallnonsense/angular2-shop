import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CartModule, CartListComponent, BasketService } from './cart';
import { ProductModule, ProductListComponent, ProductService } from './product';
import { CommonModule } from './common';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent, data: { title: 'All Products' } }
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  exports: [RouterModule],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CartModule, ProductModule, CommonModule
  ],
  providers: [
    ProductService,
    BasketService,
    { provide: APP_BASE_HREF, useValue: '/' }
  ]
})
export class AppModule { }
