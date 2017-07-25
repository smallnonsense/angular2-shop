import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UrlService, AuthService } from 'common/services';
import { User, UserClaim } from 'common/models';
import { PageNotFountComponent } from 'common/components';

import { AuthFormComponent } from 'auth/auth-form/auth-form.component';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent implements OnInit {

  public isAuthenticated: Observable<boolean>;
  public isAdmin: Observable<boolean>;
  public userName: Observable<string>;
  public returnParams: Observable<{}>;

  constructor(
    private urlService: UrlService,
    private authService: AuthService) { }

  public ngOnInit() {
    const user = this.authService.observableUser;
    this.isAuthenticated = user.map(u => u.claims.includes(UserClaim.Trusted));
    this.isAdmin = user.map(u => u.claims.includes(UserClaim.Admin));
    this.userName = user.map(u => u.fullName);
    this.returnParams = this.urlService.url.map(url => ({ returnUrl: url.url }));
  }

  public refresh() {
    this.authService.refresh();
  }
  public logOff() {
    this.authService.logOff();
  }
}
