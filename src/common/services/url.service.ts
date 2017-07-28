import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, UrlTree } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { InstanceManager } from 'common/annotations';
import { Url } from 'common/models';

import { AuthFormComponent } from 'auth/auth-form/auth-form.component';
import { PageNotFountComponent } from 'common/components/page-not-fount/page-not-fount.component';

@Injectable()
export class UrlService {

  private navigatedUrl: BehaviorSubject<Url> = new BehaviorSubject(
    { url: '/', segments: [], params: {} });

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
    InstanceManager.track();
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .filter(event => this.route.firstChild.component !== PageNotFountComponent)
      .map((event: NavigationEnd) => event.urlAfterRedirects || event.url || '/')
      .map(url => this.router.parseUrl(url))
      .map(tree => Url.from(tree))
      .subscribe(url => this.navigatedUrl.next(url));
    // this.navigatedUrl.subscribe(url => console.log(JSON.stringify(url)));
  }

  public get url(): Observable<Url> {
    return this.navigatedUrl.asObservable();
  }
  public get returnUrl(): Observable<Url> {
    return this.url.map(url => Url.parse(url.params.returnUrl));
  }
}
