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
    const returnUrl = this.urlService.url.lastSnapshots.system.params.returnUrl;
    const url = Url.parseTree(this.router.parseUrl(returnUrl));
    if (url.segments[0] === 'unreachable') {
      this.router.navigate(['authenticate'], { replaceUrl: true, queryParams: { returnUrl: url.params.returnUrl } });
      return;
    }
    this.router.navigate(['authenticate'], { replaceUrl: true, queryParams: { returnUrl: returnUrl } });
  }
}
