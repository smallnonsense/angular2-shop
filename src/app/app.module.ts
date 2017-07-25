import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Router, Routes, RouterModule } from '@angular/router';

import { AuthModule } from 'auth';
import { ProductModule } from 'product';
import { CartModule } from 'cart';
import { ServicesModule } from 'common/services';
import { ComponentsModule, HomeComponent, PageNotFountComponent } from 'common/components';
import { environment } from 'environments';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFountComponent }
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  exports: [RouterModule],
  imports: [
    BrowserModule, ServicesModule,
    ComponentsModule, ProductModule, CartModule, AuthModule,
    RouterModule.forRoot(routes, { enableTracing: environment.enableTracing })
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

