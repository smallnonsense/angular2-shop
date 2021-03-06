import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UrlService, AuthService } from 'common/services';
import { User } from 'common/models';

import { AuthFormComponent } from 'auth/auth-form/auth-form.component';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  public isAuthenticated: Observable<boolean>;
  public title: Observable<string>;
  public userName: Observable<string>;
  public returnParams: Observable<{}>;

  constructor(
    private urlService: UrlService,
    private authService: AuthService) { }

  public ngOnInit() {
    const user = this.authService.observableUser;
    this.isAuthenticated = user.map(u => u.claims.includes('known'));
    this.title = user.filter(u => u.claims.includes('admin')).map(u => '[admin]');
    this.userName = user.map(u => u.fullName);
    this.returnParams = this.urlService.url.navigated.map(url => ({ returnUrl: url.url }));
  }
}
