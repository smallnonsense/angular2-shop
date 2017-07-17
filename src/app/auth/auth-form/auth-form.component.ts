import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { User } from 'app/auth/user';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  public login: string;
  public password: string;
  public asAdministrator = false;
  public returnUrl: string[];
  public returnParams: {};

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService) { }

  public ngOnInit() {
    const url = decodeURIComponent(this.route.snapshot.queryParams.returnUrl || '/');
    const queryParamsStartsAt = url.indexOf('?');
    if (queryParamsStartsAt <= 0) {
      this.returnUrl =url.split('/').map(fragment => fragment || '/');
      this.returnParams = {};
      return;
    }

    const query = url.substring(0, queryParamsStartsAt);
    const params = url.substring(queryParamsStartsAt + 1);
    this.returnUrl = query.split('/').map(fragment => fragment || '/');
    this.returnParams = params.split('&')
      .map(pair => pair.split('='))
      .map(pair => ({ [pair[0]]: pair[1] }))
      .reduce((obj, pair) => Object.assign(obj, pair), {});
  }

  public authenticate() {
    if (this.asAdministrator) {
      this.authService.logInAsAdministrator(this.login, this.password);
    } else {
      this.authService.logIn(this.login, this.password);
    }
  }
}
