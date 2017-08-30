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
    this.urlService.param('action')
      .first()
      .subscribe(action => this.doactionFactory.create(action).do());
  }
}
