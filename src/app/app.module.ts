import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Routes, Route, RouterModule, RouteReuseStrategy } from '@angular/router';

import { AuthModule } from 'auth';
import { ProductModule } from 'product';
import { CartModule } from 'cart';
import { ServicesModule } from 'common/services';
import {
  ComponentsModule, HomeComponent,
  UnreachableComponent, DoActionComponent
} from 'common/components';
import { environment } from 'environments';

import { AppComponent } from './app.component';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';

const routes: Routes = [
  {
    path: '', component: HomeComponent, pathMatch: 'full',
    data: { required: 'none' }
  },
  {
    path: 'unreachable', component: UnreachableComponent,
    data: { required: 'none' }
  },
  {
    path: 'do/:action', component: DoActionComponent,
    data: { required: 'none' }
  },
  {
    path: '**', redirectTo: 'do/undefined',
    data: { required: 'none' }
  }
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
    { provide: APP_BASE_HREF, useValue: environment.baseUrl },
    // { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }
  ]
})
export class AppModule {

  constructor() {
    console.log(`Base URL: ${environment.baseUrl}`);
    if (!environment.production) {
      // log debug information
    }
  }
}

