import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CartModule, CartListComponent, BasketService } from 'app/cart';
import { ProductModule, ProductListComponent, ProductService } from 'app/product';
import { CommonModule } from 'app/common';
import { AuthModule } from 'app/auth';

import { environment } from 'environments';

import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'page/not/fount', component: PageNotFountComponent },
  { path: '**', redirectTo: 'page/not/fount' }
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, PageNotFountComponent],
  exports: [RouterModule],
  imports: [
    BrowserModule,
    CartModule, ProductModule, CommonModule, AuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ProductService,
    BasketService,
    { provide: APP_BASE_HREF, useValue: environment.baseUrl }
  ]
})
export class AppModule { }
