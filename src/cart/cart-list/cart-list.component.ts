import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BasketCachingService } from 'common/services';
import { BasketItem } from 'common/models';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  @Input()
  public title = 'Cart';
  public items: Observable<BasketItem[]>;

  public constructor(private service: BasketCachingService) { }

  public ngOnInit() {
    this.items = this.service.getItems();
  }

  public onRefuse(item: BasketItem) {
    this.service.removeItem(item);
  }
}
