import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { UrlService, Url } from 'app/common';
import { User } from 'app/auth';
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
  public returnUrl: Observable<string[]>;
  public returnParams: Observable<{}>;

  constructor(
    private urlService: UrlService,
    private authService: AuthService) { }

  public ngOnInit() {
    this.returnUrl = this.urlService.returnUrl.map(url => url.fragments);
    this.returnParams = this.urlService.returnUrl.map(url => url.params);
  }

  public authenticate() {
    if (this.asAdministrator) {
      this.authService.logInAsAdministrator(this.login, this.password);
    } else {
      this.authService.logIn(this.login, this.password);
    }
  }
}
