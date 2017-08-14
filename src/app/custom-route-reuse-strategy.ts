import {
  RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle, Routes
} from '@angular/router';

import { UnreachableComponent } from 'common/components';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {

  private handlers: { [key: string]: DetachedRouteHandle } = {};
  private routes: Routes = [];

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    console.log('CustomReuseStrategy:shouldDetach', route);
    return true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    console.log(`CustomReuseStrategy:store(${this.path(route)})`, route, handle);
    this.handlers[this.path(route)] = handle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    console.log('CustomReuseStrategy:shouldAttach', route);
    return !!route.routeConfig && !!this.handlers[this.path(route)];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const path = this.path(route);
    console.log(`CustomReuseStrategy:retrieve(${path})`, route);
    if (!route.routeConfig) { return null; }
    console.log(this.handlers[path]);
    return this.handlers[path];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    console.log('CustomReuseStrategy:shouldReuseRoute', future, curr);
    return future.routeConfig === curr.routeConfig;
  }

  private path(route: ActivatedRouteSnapshot) {
    return route.routeConfig.path;
  }
}
