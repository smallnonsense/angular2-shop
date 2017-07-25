import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActivatedRouteSnapshot, RouterStateSnapshot,
  CanActivate, CanActivateChild
} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from 'common/services';
import { UserClaim } from 'common/models';

@Injectable()
export class AuthenticateGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isAthenticated = this.authService.user.claims.includes(UserClaim.Trusted)
    if (!isAthenticated) {
      this.router.navigate(['authenticate'], { queryParams: { returnUrl: state.url } });
    };
    return isAthenticated;
  }
  public canActivateChild(childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
