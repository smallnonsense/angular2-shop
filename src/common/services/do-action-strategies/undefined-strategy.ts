import { Router } from '@angular/router';

import { Injectable } from '@angular/core';

import { UrlService } from 'common/services/url.service';

import { DoActionStrategy } from './do-action-strategy';
import { UrlUtil } from './url-util';

@Injectable()
export class UndefinedStrategy implements DoActionStrategy {

  public constructor(
    private urlService: UrlService,
    private router: Router,
  ) { }

  public do(): void {
    const returnUrl = UrlUtil.ensureUrl(this.urlService.navigatingUrl.url);
    if (returnUrl.includes('unreachable')) {
      // todo: avoid putting unreachable url into returnUrl
      console.warn('return url contains  link to unreachable page', returnUrl);
    }
    this.router.navigate(['unreachable'], { replaceUrl: true, queryParams: { returnUrl: returnUrl } });
  }
}
