import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Router, Routes, Route, RouterModule } from '@angular/router';

import { AuthModule, AuthorizeGuard } from 'auth';
import { ProductModule } from 'product';
import { CartModule } from 'cart';
import { ServicesModule } from 'common/services';
import { UserClaim } from 'common/models';
import { ComponentsModule, HomeComponent, PageNotFountComponent } from 'common/components';
import { environment } from 'environments';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, pathMatch: 'full',
    data: { required: UserClaim.none }
  },
  {
    path: '**', component: PageNotFountComponent,
    data: { required: UserClaim.none }
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
    { provide: APP_BASE_HREF, useValue: environment.baseUrl }
  ]
})
export class AppModule {

  constructor(private router: Router) {
    console.log(`Base URL: ${environment.baseUrl}`);
    if (!environment.production) {
      // log debug information
    }

    this.applyGuards(router);
  }

  private applyGuards(router: Router) {
    const config = router.config;
    const children = this.getChildRoute(config)
      .filter(route => !route.path.includes(':'));
      // .filter(route => !routes.includes(route));
    config.forEach(route => {
      if (!route.canActivate) {
        route.canActivate = [];
      }
      if (!route.canActivateChild) {
        route.canActivateChild = [];
      }
      route.canActivate.push(AuthorizeGuard);
      route.canActivateChild.push(AuthorizeGuard);
    });
    this.router.resetConfig(config);
  }
  private getChildRoute(children: Routes): Routes {
    if (!children || children.length === 0) {
      return [];
    }
    return children
      .map(child => this.getChildRoute(child.children))
      .reduce((accum, child) => accum.concat(child), []);
  }
}

