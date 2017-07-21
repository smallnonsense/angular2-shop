import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { AuthFormComponent } from 'app/auth';
import { Url } from 'app/common';

import { PageNotFountComponent } from 'app/page-not-fount/page-not-fount.component';

@Injectable()
export class UrlService {
  private static count = 0;
  private navigatedUrl: BehaviorSubject<Url> = new BehaviorSubject(
    { url: Url.delimiter, fragments: [], params: {} });

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .filter(event => this.route.firstChild.component !== PageNotFountComponent)
      .map((event: NavigationEnd) => event.urlAfterRedirects || event.url || Url.delimiter)
      .map(url => Url.parse(url))
      .subscribe(url => this.navigatedUrl.next(url));
    this.navigatedUrl.subscribe(url => console.log(url));
    // this.router.events.subscribe(event => console.log(event));
    // this.navigatedUrl.subscribe(url => console.log(this.route));
    console.warn(`UrlService ${UrlService.count++}`);
  }

  public get url(): Observable<Url> {
    return this.navigatedUrl.asObservable();
  }
  public get returnUrl(): Observable<Url> {
    return this.url.map(url => Url.parse(url.params.returnUrl));
  }
}
