import { Injectable } from '@angular/core';
import { Router, Route } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { InstanceManager } from 'common/annotations';
import { MenuItem, MenuItems } from 'common/models';

@Injectable()
export class MenuService {

  private itemsSubject = new BehaviorSubject<MenuItems>([]);

  public get items(): Observable<MenuItems> {
    return this.itemsSubject.asObservable();
  }

  public constructor(private router: Router) {
    InstanceManager.track();
    const items: MenuItems = this.router.config
      .filter(route => route.path && route.data && route.data.title)
      .filter(route => true/* todo: allowed? */)
      .map(route => ({
        title: route.data.title as string,
        link: `/${route.path}`
      }));
    // Observable.of([
    //   { title: 'Products', link: '/products' },
    //   { title: 'Cart', link: '/cart' }
    // ]);
    this.itemsSubject.next(items);
  }
}

class Util {
  public static title(route: Route) {
    if (route.data && route.data.title) {
      return route.data.title;
    }
    return route.path;
  }
  public static link(route: Route) {
    return `/${route.path}`;
  }
}
