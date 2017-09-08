import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, UrlService } from 'common/services';

import { DoActionStrategy } from './do-action-strategy';
import { UrlUtil } from './url-util';

@Injectable()
export class LogoutStrategy implements DoActionStrategy {

  public constructor(
    private authService: AuthService,
    private urlService: UrlService,
    private router: Router
  ) { }

  public do(): void {
    this.urlService.url.navigated.first().subscribe(url => {
      this.authService.logOff();
      this.router.navigateByUrl(url.url, { replaceUrl: true });
    });
  }
}
