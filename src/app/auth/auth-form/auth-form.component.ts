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
  public returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService) { }

  public ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  public authenticate() {
    if (this.asAdministrator) {
      this.authService.logInAsAdministrator(this.login, this.password);
    } else {
      this.authService.logIn(this.login, this.password);
    }
  }
}
