import { Component, Optional, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { InfoService } from 'app/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
  implements OnInit {

  constructor(
    @Optional()
    private infoService: InfoService,
    private titleService: Title) {
  }

  ngOnInit() {
    if (this.infoService) {
      const info = this.infoService.get();
      this.titleService.setTitle(`${info.app} v${info.ver}`);
    } else {
      this.titleService.setTitle('New Store');
    }
  }
}
