import { Component, OnInit } from '@angular/core';

import { User, MenuItem } from 'common/models';
import { UrlService, AuthService, MenuService } from 'common/services';

import { AuthFormComponent } from 'auth/auth-form/auth-form.component';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent implements OnInit {

  public menuItem: MenuItem;
  public isAuthenticated: boolean;
  public returnParams: any;

  constructor(
    private urlService: UrlService,
    private menuService: MenuService,
    private authService: AuthService) { }

  public ngOnInit() {
    this.authService.observableUser.subscribe(u =>
      this.isAuthenticated = u.claims.includes('known')
    );
    this.menuService.authenticate.subscribe(item =>
      this.menuItem = item
    );
    this.urlService.url.navigated.subscribe(url =>
      this.returnParams = { returnUrl: url.url }
    );
  }

  public quickauth() {
    this.authService.logIn('quick@user', 'no-pwd');
  }
}
