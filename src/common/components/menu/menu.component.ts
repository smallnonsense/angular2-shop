import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AuthService, MenuService } from 'common/services';
import { UserClaim, MenuItems } from 'common/models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public items: Observable<MenuItems>;

  constructor(private menuService: MenuService) { }

  ngOnInit() {
      this.items = this.menuService.items;
  }
}
