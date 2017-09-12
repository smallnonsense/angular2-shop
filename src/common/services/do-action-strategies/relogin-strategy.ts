import { Router } from '@angular/router';

import { Injectable } from '@angular/core';

import { AuthService } from 'common/services/auth.service';
import { UrlService } from 'common/services/url.service';

import { Url } from 'common/models';

import { DoActionStrategy } from './do-action-strategy';
import { UrlUtil } from './url-util';

@Injectable()
export class ReloginStrategy implements DoActionStrategy {

  public constructor(
    private authService: AuthService,
    private urlService: UrlService,
    private router: Router,
  ) {
  }

  public do(): void {
    this.urlService.url.system
    .map(url => url.params.returnUrl)
    // todo: move parsing into url service
    .map(url => this.router.parseUrl(url))
    .map(url => Url.parseTree(url))
    .first().subscribe(url => {
      this.authService.refresh();
      if (url.segments[0] === 'unreachable') {
        // todo: move navigation into separate service
        this.router.navigateByUrl(url.params.returnUrl, { replaceUrl: true });
        return;
      }
      // todo: move navigation into separate service
      this.router.navigateByUrl(url.url, { replaceUrl: true, queryParams: { returnUrl: url.url } });
    });
  }
}
