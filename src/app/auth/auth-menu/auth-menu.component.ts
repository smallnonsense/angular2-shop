import { UserClaim } from 'app/auth/user-claim.enum';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from 'app/auth/user';
import { AuthService } from 'app/auth/auth.service';
import { AuthFormComponent } from 'app/auth';
import { PageNotFountComponent } from 'app/page-not-fount/page-not-fount.component';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent
  implements OnInit {

  public isAuthenticated: Observable<boolean>;
  public isAdmin: Observable<boolean>;
  public userName: Observable<string>;
  public returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  public ngOnInit() {
    const user = this.authService.observableUser;
    this.isAuthenticated = user.map(u => u.claims.includes(UserClaim.Trusted));
    this.isAdmin = user.map(u => u.claims.includes(UserClaim.Admin));
    this.userName = user.map(u => u.fullName);

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .filter(event =>
        this.route.firstChild.component !== AuthFormComponent
        && this.route.firstChild.component !== PageNotFountComponent)
      .subscribe((event: NavigationEnd) =>
      this.returnUrl = event.urlAfterRedirects || event.url || '/');
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .filter(event =>
        this.route.firstChild.component !== AuthFormComponent
        && this.route.firstChild.component !== PageNotFountComponent)
      .subscribe((event: NavigationEnd) =>
        console.log());
      this.router.events.subscribe(event => console.log(event));
  }

  public logOff() {
    this.authService.logOff();
  }
}
