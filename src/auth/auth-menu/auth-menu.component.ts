import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UrlService, AuthService } from 'common/services';
import { User } from 'common/models';

import { AuthFormComponent } from 'auth/auth-form/auth-form.component';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent implements OnInit {

  public isGuest: Observable<boolean>;
  public returnParams: Observable<{}>;

  constructor(
    private urlService: UrlService,
    private authService: AuthService) { }

  public ngOnInit() {
    this.isGuest = this.authService.observableUser
    .map(u => !u.claims.includes('known'));
    this.returnParams = this.urlService.url
      .map(url => ({ returnUrl: url.url }));
  }
}
