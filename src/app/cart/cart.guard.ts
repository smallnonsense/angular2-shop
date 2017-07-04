import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActivatedRouteSnapshot, RouterStateSnapshot,
  CanActivate, CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService, UserClaim } from 'app/auth';

@Injectable()
export class CartGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const hasCart = this.authService.user.claims.includes(UserClaim.Cart)
    if (!hasCart) {
      this.router.navigate(['']);
    };
    return hasCart;
  }
  public canActivateChild(childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
