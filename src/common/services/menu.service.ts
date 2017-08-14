import { Injectable } from '@angular/core';
import { Router, Route } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { InstanceManager } from 'common/annotations';
import { User, MenuItem, MenuItems } from 'common/models';

import { AuthService } from 'common/services/auth.service';

@Injectable()
export class MenuService {

  public items: Observable<MenuItems>;

  public constructor(
    private router: Router,
    private authService: AuthService) {
    InstanceManager.track();
    this.items = authService.observableUser.map(user => this.buildFor(user));
  }
  private buildFor(user: User): MenuItems {
    return this.router.config
      .filter(route => route.path && route.data && route.data.title)
      .filter(route => true/* todo: allowed? */)
      .map(route => ({
        title: route.data.title as string,
        link: `/${route.path}`
      }));
  }
}

