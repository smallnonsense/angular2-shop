import { Router } from '@angular/router';

import { Injectable } from '@angular/core';

import { AuthService } from 'common/services/auth.service';
import { UrlService } from 'common/services/url.service';

import { DoActionStrategy } from './do-action-strategy';
import { UrlUtil } from './url-util';

@Injectable()
export class ReloginStrategy implements DoActionStrategy {

  public constructor(
    private authService: AuthService,
    private urlService: UrlService,
    private router: Router,
  ) { }

  public do(): void {
    this.authService.refresh();
    const url = this.urlService.url.lastSnapshots.system.params.returnUrl;
    this.router.navigateByUrl(url, { replaceUrl: true });
  }
}
