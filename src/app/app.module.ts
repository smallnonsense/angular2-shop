import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Router, Routes, RouterModule } from '@angular/router';

import { AuthModule } from 'app/auth';
import { ProductModule } from 'app/product';
import { CartModule } from 'app/cart';
import { ServicesModule } from 'app/common/services';

import { environment } from 'environments';

import {
  ComponentsModule, MenuComponent,
  HomeComponent, PageNotFountComponent
} from './common/components';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '**', redirectTo: 'page/not/fount' }
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  exports: [RouterModule],
  imports: [
    BrowserModule, ServicesModule,
    ComponentsModule, ProductModule, CartModule, AuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
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

