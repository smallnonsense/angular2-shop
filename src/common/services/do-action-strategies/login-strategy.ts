import { Router } from '@angular/router';

import { Injectable } from '@angular/core';

import { DoActionStrategy } from './do-action-strategy';
import { UrlUtil } from './url-util';

@Injectable()
export class LoginStrategy implements DoActionStrategy {

  public constructor(private router: Router) { }

  public do(): void {
    // todo: avoid redirecting unreachable page, use it's returnUrl instead
    this.router.navigate(['authenticate'], { replaceUrl: true, queryParamsHandling: 'preserve' });
  }
}
