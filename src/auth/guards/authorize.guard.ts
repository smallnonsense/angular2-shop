import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ActivatedRouteSnapshot, RouterStateSnapshot,
  CanActivate, CanActivateChild
} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from 'common/services';
import { UserClaim, UserClaims, Url } from 'common/models';

@Injectable()
export class AuthorizeGuard implements CanActivate, CanActivateChild {

  constructor(
    private activated: ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const required = Util.getRequiredClaim(next);
    if (required.includes('none')) {
      return true;
    }
    const claims = this.authService.user.claims;
    const allowed = claims.every(claim => required.includes(claim));
    if (!allowed) {
      console.warn(`User requires '${required}' permissions to '${state.url}'`);
      if (state.url.includes('unauthorized')) {
        console.error('Routing error: Unauthorized route configuration causes closed loop.');
        return false;
      }
      this.router.navigate(['unauthorized'], { queryParams: { returnUrl: state.url } });
    };
    return allowed;
  }
  public canActivateChild(childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}

class Util {
  public static getRequiredClaim(next: ActivatedRouteSnapshot): UserClaims {
    if (next.data.required) {
      if (next.data.required instanceof Array) {
        return next.data.required;
      }
      return [next.data.required];
    }
    console.warn('valid claims?', next.url.map(segment => <UserClaim>segment.path));
    return next.url
    .filter(segment => segment.parameterMap.keys.length === 0)
    .map(segment => <UserClaim>segment.path);
  }
}
