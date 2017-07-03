import { Injectable } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';
import {
  ActivatedRouteSnapshot, RouterStateSnapshot,
  CanActivate
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthenticateGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const user = this.authService.authorizedUser();
    user
    .filter(u => u === null)
    .subscribe(u => console.log(state));
    user
    .filter(u => u === null)
    .subscribe(u => {
      console.log('u === null');
      console.log(state);
    });
    user
    .filter(u => u !== null)
    .subscribe(u => {
      console.log('u !== null');
      console.log(state);
    });
    user
    .filter(u => u === null)
    .subscribe(u => this.router.navigate(['authenticate']));
    return user.map(u => u !== null);
  }
}
