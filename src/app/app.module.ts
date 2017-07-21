import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Router, Routes, RouterModule } from '@angular/router';

import { AuthModule } from 'app/auth';
import { CartDetailModule } from 'app/cart';
import { CommonModule, StorageService } from 'app/common';

import { environment } from 'environments';

import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', loadChildren: 'app/product/product.module#ProductModule' },
  { path: 'cart', loadChildren: 'app/cart/cart-detail/cart-detail.module#CartDetailModule' },
  { path: 'page/not/fount', component: PageNotFountComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: 'page/not/fount' }
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, PageNotFountComponent, UnauthorizedComponent, MenuComponent, HomeComponent],
  exports: [RouterModule],
  imports: [
    BrowserModule,
    CartDetailModule, CommonModule, AuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    StorageService,
    { provide: APP_BASE_HREF, useValue: environment.baseUrl }
  ]
})
export class AppModule {

  constructor(private router: Router) {
    console.log(`Base URL: ${environment.baseUrl}`);
    if (!environment.production) {
      // log debug information
    }
  }
}

