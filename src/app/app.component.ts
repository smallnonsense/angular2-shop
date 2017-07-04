import { Component, Optional, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/toPromise';

import { InfoService } from 'app/common';
import { User } from 'app/auth/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
  implements OnInit {

  public user: Observable<User>;

  constructor(
    @Optional()
    private infoService: InfoService,
    private titleService: Title) { }

  ngOnInit() {
    if (this.infoService) {
      const info = this.infoService.get();
      this.titleService.setTitle(`${info.app} v${info.ver}`);
    } else {
      this.titleService.setTitle('New Store');
    }
  }
}
