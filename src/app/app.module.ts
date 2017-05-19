import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Routes, Route, RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';

import { CartModule, CartComponent } from 'app/cart/cart.module';
import { ProductModule, ProductListComponent } from 'app/product/product.module';
import { CommonModule } from 'app/common/common.module';

import { AppComponent } from 'app/app.component';

const routes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: 'products', component: ProductListComponent, data: { title: 'All Products' } }
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    // , FormsModule, HttpModule
    CartModule, ProductModule, CommonModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  exports: [RouterModule]
})
export class AppModule { }
