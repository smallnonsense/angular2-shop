import { UserClaim } from 'app/auth/user-claim.enum';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UrlService } from 'app/common';

import { User } from 'app/auth/user';
import { AuthService } from 'app/auth/auth.service';
import { AuthFormComponent } from 'app/auth';
import { PageNotFountComponent } from 'app/page-not-fount/page-not-fount.component';

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
    const returnUrl = this.urlService.url
      .filter(url => url.fragments.includes('authenticate'))
      .map(url => ({ returnUrl: url.params.returnUrl }));
    const currentUrl = this.urlService.url
      .filter(url => !url.fragments.includes('authenticate'))
      .map(url => ({ returnUrl: url.url }));
    this.returnParams = currentUrl.merge(returnUrl);
  }

  public refresh() {
    this.authService.refresh();
  }
  public logOff() {
    this.authService.logOff();
  }
}
