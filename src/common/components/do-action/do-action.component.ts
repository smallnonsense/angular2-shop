import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DoActionFactory } from 'common/services/do-action-strategies';
import { UrlService } from 'common/services';

@Component({ template: '<b>Something is going wrong! See console for details.</b>' })
export class DoActionComponent implements OnInit {
  public constructor(
    private urlService: UrlService,
    private doactionFactory: DoActionFactory
  ) { }

  public ngOnInit() {
    this.urlService.url.system.subscribe(system => console.log(system));
    this.urlService.url.system
      .map(url => url.params.action)
      .filter(action => !!action)
      .subscribe(action => this.doactionFactory.create(action).do());
  }
}
