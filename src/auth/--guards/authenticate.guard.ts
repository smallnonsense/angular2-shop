import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActivatedRouteSnapshot, RouterStateSnapshot,
  CanActivate, CanActivateChild
} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService, UrlService } from 'common/services';

@Injectable()
export class AuthenticateGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private urlService: UrlService,
    private router: Router) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isAthenticated = this.authService.user.claims.includes('known')
    if (!isAthenticated) {
      // todo: move navigation into separate service
      this.router.navigate(['authenticate'], { queryParams: { returnUrl: state.url } });
    };
    return isAthenticated;
  }
  public canActivateChild(childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
