import { Injectable } from '@angular/core';
import { Router, Route, Routes, CanActivate, CanActivateChild } from '@angular/router';

import { AuthService } from './auth.service';
import { User, UserClaim, UserClaims } from 'common/models';
import { UnreachableComponent } from 'common/components';

@Injectable()
export class RouteService {

  private routes: Routes;

  public constructor(
    private router: Router,
    private authService: AuthService) {
    this.routes = router.config;
  }

  public applyGuards(guards: any[]) {
    const config = this.router.config;
    config.forEach(route => {
      if (!route.canActivate) { route.canActivate = []; }
      if (!route.canActivateChild) { route.canActivateChild = []; }
      guards.forEach(guard => {
        if (guard.canActivate) { route.canActivate.push(guard); }
        if (guard.canActivateChild) { route.canActivateChild.push(guard); }
      });
      this.router.resetConfig(config);
    });
  }
  public resetOnAuthorize() {
    this.authService.observableUser.subscribe(user => this.refresh(user));
  }

  private refresh(user: User) {
    const allowerRoutes = Util.allowedRoutes(this.routes, user.claims);
    this.router.resetConfig(allowerRoutes);
    // todo: find suitable way to inform custom reuse strategy without cross-reference
    // if (this.router.routeReuseStrategy['routes']) {
    //   this.router.routeReuseStrategy['routes'] = Util.getChildRoute(allowerRoutes);
    // }
  }
}


class Util {
  public static getChildRoute(children: Routes): Routes {
    if (!children || children.length === 0) {
      return [];
    }
    return children
      .map(child => Util.getChildRoute(child.children))
      .reduce((accum, child) => accum.concat(child), []);
  }
  public static allowedRoutes(routes: Routes, claims: UserClaims): Routes {
    if (!routes) { return routes; }
    const allowedRoutes = routes.filter(route => Util.isAllowed(route, claims));
    allowedRoutes.forEach(route => route.children = Util.allowedRoutes(route.children, claims))
    return allowedRoutes;
  }
  public static isAllowed(route: Route, claims: UserClaims): boolean {
    const required = Util.requriedClaims(route);
    return required.includes('none') || required.every(claim => claims.includes(claim));
  }
  private static requriedClaims(route: Route): UserClaims {
    if (route && route.data && route.data.required) {
      if (route.data.required instanceof Array) {
        return route.data.required;
      }
      return [route.data.required];
    }
    return route.path.split('/')
      .filter(segment => !segment.includes(':'))
      .map(segment => <UserClaim>segment);
  }
}

