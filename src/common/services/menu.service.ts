import { Injectable } from '@angular/core';
import { Router, Route } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { InstanceManager } from 'common/annotations';
import { User, MenuItem, MenuItems } from 'common/models';

import { RouteService } from 'common/services/route.service';

@Injectable()
export class MenuService {

  public constructor(private routeService: RouteService) {
    InstanceManager.track();
  }

  public get items(): Observable<MenuItems> {
    return this.routeService.reachableRoutes.map(routes =>
      routes
        .filter(route => route.path && route.data && route.data.title)
        .map(route => ({
          title: route.data.title as string,
          link: `/${route.path}`
        })
        )
    );
  }
  public get checkout(): Observable<MenuItem> {
    return this.routeService.reachableRoutes.map(routes => {
      const checkout = routes.find(route => route.path === 'cart/checkout');
      if (!checkout) {
        console.warn('Checkout is disabled or undefined in routes');
        return { title: 'Checkout', link: null };
      }
      return { title: 'Checkout', link: `/${checkout.path}` };
    });
  }
  public get authenticate(): Observable<MenuItem> {
    return this.routeService.reachableRoutes.map(routes => {
      const authenticate = routes.find(route => route.path === 'authenticate');
      if (!authenticate) {
        console.warn('Authentication is disabled or undefined in routes');
        return { title: 'Log In', link: null };
      }
      const doer = routes.find(route => route.path === 'do/:action');
      if (!doer) {
        console.warn('do/action is disabled or undefined in routes');
        return { title: 'Log In', link: null };
      }
      return { title: 'Log In', link: `/do/login` };
    });
  }
}

