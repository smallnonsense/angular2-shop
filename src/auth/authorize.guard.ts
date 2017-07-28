import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ActivatedRouteSnapshot, RouterStateSnapshot,
  CanActivate, CanActivateChild
} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from 'common/services';
import { UserClaim, Url } from 'common/models';

@Injectable()
export class AuthorizeGuard implements CanActivate, CanActivateChild {

  constructor(
    private activated: ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const required: UserClaim = Util.getRequiredClaim(next);
    if (required === UserClaim.none) {
      return true;
    }
    const allowed = this.authService.user.claims.includes(required);
    if (!allowed) {
      console.warn(`User requires '${UserClaim[required]}' permission to '${state.url}'`);
      if (state.url.includes('unauthorized')) {
        console.error('Routing error: Unauthorized route configuration causes closed loop.');
        return false;
      }
      this.router.navigate(
        ['unauthorized'], { queryParams: { returnUrl: state.url } });
    };
    return allowed;
  }
  public canActivateChild(childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}

class Util {
  public static getRequiredClaim(next: ActivatedRouteSnapshot) {
    return next.data.required
      || UserClaim[next.routeConfig.path]
      || UserClaim.none;
  }
}

