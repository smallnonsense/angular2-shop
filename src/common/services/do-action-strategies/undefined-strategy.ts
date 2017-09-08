import { Router } from '@angular/router';

import { Injectable } from '@angular/core';

import { UrlService } from 'common/services';

import { DoActionStrategy } from './do-action-strategy';
import { UrlUtil } from './url-util';


@Injectable()
export class UndefinedStrategy implements DoActionStrategy {

  public constructor(
    private urlService: UrlService,
    private router: Router,
  ) { }

  public do(): void {
    this.urlService.url.navigated.first().subscribe(url => {
      if (url.segments.includes('unreachable')) {
        this.router.navigateByUrl(url.url, { replaceUrl: true });
        return;
      }
      this.router.navigate(['unreachable'], { replaceUrl: true, queryParams: { returnUrl: url.url } });
    });
  }
}
