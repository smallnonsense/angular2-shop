import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from 'app/auth/user';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-auth-detail',
  templateUrl: './auth-detail.component.html',
  styleUrls: ['./auth-detail.component.css']
})
export class AuthDetailComponent
  implements OnInit {

  private user: Observable<User>;

  public isAuthenticated: Observable<boolean>;
  public userId: Observable<string>;
  public userName: Observable<string>;
  public returnUrl: Observable<UrlSegment[]>;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService) {
  }

  public ngOnInit() {
    this.user = this.authService.authorized();
    this.isAuthenticated = this.user.map(u => u !== null);
    this.userId = this.user.map(u => u.id);
    this.userName = this.user.map(u => u.fullName);
    this.returnUrl = this.route.url;
  }
}
