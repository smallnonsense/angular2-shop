import { Router } from '@angular/router';

import { Injectable } from '@angular/core';

import { UrlService } from 'common/services';
import { Url } from 'common/models';

import { DoActionStrategy } from './do-action-strategy';

@Injectable()
export class LoginStrategy implements DoActionStrategy {

  public constructor(
    private urlService: UrlService,
    private router: Router) { }

  public do(): void {
    this.urlService.url.system
    .map(url => url.params.returnUrl)
    // todo: move parsing into url service
    .map(url => this.router.parseUrl(url))
    .map(url => Url.parseTree(url))
    .first().subscribe(url => {
      // todo: pass user/password here in data
      // todo: move authentication here
      if (url.segments[0] === 'unreachable') {
        // todo: move navigation into separate service
        this.router.navigate(['authenticate'], { replaceUrl: true, queryParams: { returnUrl: url.params.returnUrl } });
        return;
      }
      // todo: move navigation into separate service
      this.router.navigate(['authenticate'], { replaceUrl: true, queryParams: { returnUrl: url.url } });
    });
  }
}
