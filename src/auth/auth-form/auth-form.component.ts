import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { UrlService, AuthService } from 'common/services';
import { Url } from 'common/models';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  public login: string;
  public password: string;
  public asAdministrator = false;
  public returnUrl: Observable<string[]>;
  public returnParams: Observable<{}>;

  constructor(
    private urlService: UrlService,
    private authService: AuthService) { }

  public ngOnInit() {
    const returnUrl = this.urlService.url.navigated
    .map(url => url.params.returnUrl)
    // todo: move pasrsing to urlService
    .map(url => Url.parse(url));
    this.returnUrl = returnUrl.map(url => url.segments);
    this.returnParams = returnUrl.map(url => url.params);
  }
  public authenticate() {
    if (this.asAdministrator) {
      this.authService.logInAsAdministrator(this.login, this.password);
    } else {
      this.authService.logIn(this.login, this.password);
    }
  }
}
