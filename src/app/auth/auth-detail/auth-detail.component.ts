import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';

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
  public userId: Observable<string>;
  public userName: Observable<string>;
  public returnUrl: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  public ngOnInit() {
    const user = this.authService.authorizedUser();
    this.isAuthenticated = user.map(u => u !== null);
    this.userId = user.filter(u => u !== null).map(u => u.id || '0');
    this.userName = user.filter(u => u !== null).map(u => u.fullName || 'Unknown User');

    const defaultUrl = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .filter(event =>
        this.route.firstChild.component === AuthFormComponent
        || this.route.firstChild.component === PageNotFountComponent)
      .map<NavigationEnd, string>(event => '/');
    this.returnUrl = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .filter(event =>
        this.route.firstChild.component !== AuthFormComponent
        && this.route.firstChild.component !== PageNotFountComponent)
      .map<NavigationEnd, string>(event => event.urlAfterRedirects || event.url)
      .merge(defaultUrl);
  }
}
