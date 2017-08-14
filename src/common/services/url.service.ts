import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, UrlTree } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { InstanceManager } from 'common/annotations';
import { Url } from 'common/models';

import { AuthFormComponent } from 'auth/auth-form/auth-form.component';

@Injectable()
export class UrlService {

  private navigatedSubject: BehaviorSubject<Url> = new BehaviorSubject(
    { url: '/', segments: [], params: {} });

  public navigatingUrl: Url;
  public navigatedUrl: Url;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
    InstanceManager.track();
    // todo: remove
    router.events
      .subscribe(url => {
        console.log(url);
      });
    router.events
      .filter(event => event instanceof NavigationStart)
      .map((event: NavigationStart) => this.router.parseUrl(event.url || '/'))
      .map(tree => Url.parseTree(tree))
      .subscribe(url => this.navigatingUrl = url);
    router.events
      .filter(event => event instanceof NavigationEnd)
      .map((event: NavigationEnd) => event.urlAfterRedirects || event.url || '/')
      .map(url => this.router.parseUrl(url))
      .map(tree => Url.parseTree(tree))
      .subscribe(url => this.navigatedSubject.next(url));
    this.url.subscribe(url => this.navigatedUrl = url);
    //  this.url.subscribe(url => console.log(JSON.stringify(url)));
  }

  public get url(): Observable<Url> {
    return this.navigatedSubject.asObservable();
  }
  public param(name: string): Observable<string> {
    return this.url.map(url => url.params[name]);
  }
  public paramAsUrl(name: string): Observable<Url> {
    return this.param(name).map(param => Url.parse(param));
  }
}