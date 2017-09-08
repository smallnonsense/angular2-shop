import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, UrlService } from 'common/services';
import { InstanceManager } from 'common/annotations';

import { DoActionStrategy } from './do-action-strategy';
import { ReloginStrategy } from './relogin-strategy';
import { LoginStrategy } from './login-strategy';
import { LogoutStrategy } from './logout-strategy';
import { UnsupportedStrategy } from './unsupported-strategy';
import { UndefinedStrategy } from './undefined-strategy';

@Injectable()
export class DoActionResolver {

  constructor(
    private authService: AuthService,
    private urlService: UrlService,
    private router: Router) {
    InstanceManager.track();
  }

  public resolve(action: string): DoActionStrategy {
    console.log('do', action);
    switch (action) {
      case 'relogin':
        return new ReloginStrategy(this.authService, this.urlService, this.router);
      case 'login':
        return new LoginStrategy(this.urlService, this.router);
      case 'logout':
        return new LogoutStrategy(this.authService, this.urlService, this.router);
      case 'undefined':
        return new UndefinedStrategy(this.urlService, this.router);
      default:
        return new UnsupportedStrategy(action);
    }
  }
}
