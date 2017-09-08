import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DoActionResolver } from 'common/services/do-action-strategies';
import { UrlService } from 'common/services';

@Component({ template: '<b>Something is going wrong! See console for details.</b>' })
export class DoActionComponent implements OnInit {
  public constructor(
    private urlService: UrlService,
    private actionResolver: DoActionResolver
  ) { }

  public ngOnInit() {
    this.urlService.url.system
      .map(url => url.params.action)
      .filter(action => !!action)
      .subscribe(action => this.actionResolver.resolve(action).do());
  }
}
