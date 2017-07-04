import { UserClaim } from 'app/auth/user-claim.enum';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from 'app/auth/user';
import { AuthService } from 'app/auth/auth.service';
import { AuthFormComponent } from 'app/auth';
import { PageNotFountComponent } from 'app/page-not-fount/page-not-fount.component';

@Component({
  selector: 'app-auth-detail',
  templateUrl: './auth-detail.component.html',
  styleUrls: ['./auth-detail.component.css']
})
export class AuthDetailComponent
  implements OnInit {

  public isAuthenticated: Observable<boolean>;
  public isAdmin: Observable<boolean>;
  public userName: Observable<string>;
  public returnUrl: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  public ngOnInit() {
    const user = this.authService.observableUser;
    this.isAuthenticated = user.map(u => u.claims.includes(UserClaim.Trusted));
    this.isAdmin = user.map(u => u.claims.includes(UserClaim.Admin));
    this.userName = user.map(u => u.fullName);

    const defaultUrl = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .filter(event =>
        this.route.firstChild.component === AuthFormComponent
        || this.route.firstChild.component === PageNotFountComponent)
      .map<NavigationEnd, string>(event => this.route.snapshot.queryParams.returnUrl || '/');
    this.returnUrl = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .filter(event =>
        this.route.firstChild.component !== AuthFormComponent
        && this.route.firstChild.component !== PageNotFountComponent)
      .map<NavigationEnd, string>(event => event.urlAfterRedirects || event.url)
      .merge(defaultUrl);
  }

  public logOff() {
    this.authService.logOff();
  }
}
