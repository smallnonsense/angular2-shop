import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs/Rx';

import { UrlService, AuthService } from 'common/services';
import { Url, User } from 'common/models';

import { AuthFormComponent } from 'auth/auth-form/auth-form.component';

@Component({ template: '<b>Something is going wrong! See console for details.</b>' })
export class DoActionComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private urlService: UrlService,
    private route: ActivatedRoute,
    private router: Router) { }

  public ngOnInit() {
    // todo: handle actions in separate strategies
    // todo: UrlService returns parameters+query prameters
    this.route.paramMap.subscribe(param => {
      const action = param.get('action');
      switch (action) {
        case 'relogin':
          this.relogin();
          break;
        case 'login':
          this.login()
          break;
        case 'logout':
          this.logout();
          break;
        case 'undefined':
          this.unreachable();
          break;
        default:
          console.error(`Unsupported action '${action}'. No action is executed.`);
          break;
      }
    });
  }

  private relogin() {
    this.authService.refresh();
    const url = this.ensureUrl(this.urlService.navigatedUrl.params.returnUrl);
    this.router.navigateByUrl(url, { replaceUrl: true });
  }
  private login() {
    // todo: avoid redirecting unreachable page, it's returnUrl instead
    this.router.navigate(['authenticate'], { replaceUrl: true, queryParamsHandling: 'preserve' });
  }
  private logout() {
    this.authService.logOff();
    const url = this.ensureUrl(this.urlService.navigatedUrl.params.returnUrl);
    this.router.navigateByUrl(url, { replaceUrl: true });
  }
  private unreachable() {
    const returnUrl = this.ensureUrl(this.urlService.navigatingUrl.url);
    if (returnUrl.includes('unreachable')) {
      // todo: avoid putting unreachable url into returnUrl
      console.warn('return url contains  link to unreachable page', returnUrl);
    }
    this.router.navigate(['unreachable'], { replaceUrl: true, queryParams: { returnUrl: returnUrl } });
  }
  private ensureUrl(url: string) {
    if (!url) {
      console.warn('url isn\'t defined. taking base \'/\'');
    }
    return url || '/';
  }
}
