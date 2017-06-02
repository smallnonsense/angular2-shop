import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from 'app/auth/user';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  public returnUrl: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.returnUrl = this.route.queryParams.map(params => params.returnUrl || '/');
  }
}
