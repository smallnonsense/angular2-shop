import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, UrlTree } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { InstanceManager } from 'common/annotations';
import { Url } from 'common/models';

import { AuthFormComponent } from 'auth/auth-form/auth-form.component';
import { NavigationState } from 'common/models/navigation-state';

@Injectable()
export class UrlService {

  private requested = new BehaviorSubject<Url>(Url.empty);
  private navigated = new BehaviorSubject<Url>(Url.empty);
  private system = new BehaviorSubject<Url>(Url.empty);

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
    InstanceManager.track();
    // router.events
    //   .filter(event => event instanceof NavigationEnd)
    //   .subscribe(event => {
    //     console.log(event);
    //   });
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map((event: NavigationEnd) => event.url || '/')
      .map(url => this.parse(url))
      .filter(url => url.segments[0] === 'do')
      .mergeMap(sysUrl => this.enrichWithRoute(sysUrl))
      .subscribe(url => this.system.next(url));
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map((event: NavigationEnd) => event.url || '/')
      .map(url => this.parse(url))
      .filter(url => url.segments[0] !== 'do')
      .mergeMap(userUrl => this.enrichWithRoute(userUrl))
      .subscribe(url => this.requested.next(url));
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map((event: NavigationEnd) => event.urlAfterRedirects || '/')
      .map(url => this.parse(url))
      .filter(url => url.segments[0] !== 'do')
      .mergeMap(userUrl => this.enrichWithRoute(userUrl))
      .subscribe(url => this.navigated.next(url));
  }

  public get url(): NavigationState {
    return {
      requested: this.requested.asObservable(),
      navigated: this.navigated.asObservable(),
      system: this.system.asObservable()
    };
  }

  private parse(url: string): Url {
    const tree = this.router.parseUrl(url);
    return Url.parseTree(tree);
  }
  private enrichWithRoute(result: Url): Observable<Url> {
    return this.route.children.reduce((merged, child) =>
      merged.mergeMap(url =>
        child.params.map(params =>
          Url.of(url.url, url.segments, { ...url.params, ...params })
        )
      ), Observable.of(result)
    );
  }
}
