import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Router, Routes, RouterModule } from '@angular/router';

import { CartModule, CartListComponent, BasketService, BasketCachingService } from 'app/cart';
import { ProductModule, ProductListComponent, ProductService } from 'app/product';
import { CommonModule } from 'app/common';
import { AuthModule, AuthenticateGuard } from 'app/auth';

import { environment } from 'environments';

import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'page/not/fount', component: PageNotFountComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: 'page/not/fount' }
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, PageNotFountComponent, UnauthorizedComponent, MenuComponent],
  exports: [RouterModule],
  imports: [
    BrowserModule,
    CartModule, ProductModule, CommonModule, AuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ProductService,
    BasketService,
    BasketCachingService,
    { provide: APP_BASE_HREF, useValue: environment.baseUrl }
  ]
})
export class AppModule {

  constructor(private router: Router) {
    console.log(`Base URL: ${environment.baseUrl}`);
    if (!environment.production) {
      this.router.events.subscribe(event => console.log(event));
    }
  }
}

