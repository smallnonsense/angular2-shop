import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Routes, Route, RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';

import { CartModule, CartListComponent, BasketService } from './cart';
import { ProductModule, ProductListComponent, ProductService } from './product';
import { CommonModule } from './common';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'cart', component: CartListComponent, data: { title: 'Products in your cart' } },
  { path: 'products', component: ProductListComponent, data: { title: 'All Products' } }
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule, //FormsModule, HttpModule,
    RouterModule.forRoot(routes),
    CartModule, ProductModule, CommonModule
  ],
  providers: [
    ProductService,
    BasketService,
    { provide: APP_BASE_HREF, useValue: '/' }],
  exports: [RouterModule]
})
export class AppModule { }
