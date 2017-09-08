import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, UrlTree } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { InstanceManager } from 'common/annotations';
import { Url } from 'common/models';

import { AuthFormComponent } from 'auth/auth-form/auth-form.component';
import { NavigationState } from 'common/models/navigation-state';

@Injectable()
export class UrlService {

  private requestedSubject: BehaviorSubject<Url> = new BehaviorSubject(
    { url: '/', segments: [], params: {} });
  private navigatedSubject: BehaviorSubject<Url> = new BehaviorSubject(
    { url: '/', segments: [], params: {} });
  private systemSubject: BehaviorSubject<Url> = new BehaviorSubject(
    { url: '/', segments: [], params: {} });

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
    InstanceManager.track();
    // router.events
    //   .filter(event => event instanceof NavigationEnd)
    //   .subscribe(event => {
    //     console.log(event);
    //   });
    // todo: remove if the approach has failed
    const sys = this.systemUrl.mergeMap(sysUrl =>
      route.children.reduce((merged, child) =>
        merged.mergeMap(url =>
          child.params.map(params =>
            Url.of(url.url, url.segments, { ...url.params, ...params })
          )
        ), Observable.of(sysUrl))
    );
    sys.subscribe(url => this.systemSubject.next(url));
    // todo: revert if approach above has failed
    // this.systemUrl.subscribe(url => {
    //   route.children.forEach(child => {
    //     child.params.subscribe(params => {
    //       url.params = Object.assign(url.params, params);
    //       this.systemSubject.next(url);
    //     });
    //   });
    // });
    this.userUrl.subscribe(url => {
      route.children.forEach(child => {
        child.params.subscribe(params => {
          url.params = Object.assign(url.params, params);
          this.requestedSubject.next(url);
          console.log('requested', JSON.stringify(url));
        });
      });
    });
    this.userUrl.subscribe(url => {
      route.children.forEach(child => {
        child.params.subscribe(params => {
          url.params = Object.assign(url.params, params);
          this.navigatedSubject.next(url);
          console.log('navigated', JSON.stringify(url));
        });
      });
    });
  }

  public get url(): NavigationState {
    return {
      requested: this.requestedSubject.asObservable(),
      navigated: this.navigatedSubject.asObservable(),
      system: this.systemSubject.asObservable(),
      lastSnapshots: {
        requested: this.requestedSubject.value,
        navigated: this.navigatedSubject.value,
        system: this.systemSubject.value
      }
    };
  }

  private get systemUrl() {
    return this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map((event: NavigationEnd) => event.url || '/')
      .map(url => this.router.parseUrl(url))
      .map(tree => Url.parseTree(tree))
      .filter(url => url.segments[0] === 'do');
  }

  private get userUrl() {
    return this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map((event: NavigationEnd) => event.urlAfterRedirects || '/')
      .map(url => this.router.parseUrl(url))
      .map(tree => Url.parseTree(tree))
      .filter(url => url.segments[0] !== 'do');
  }
}
