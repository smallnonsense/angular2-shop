import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BasketItem } from 'app/cart/basket-item';
import { BasketService } from 'app/cart/basket.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  @Input()
  public title = 'Cart';
  public items: Observable<BasketItem[]>;

  public constructor(private basketService: BasketService) { }

  public ngOnInit() {
    this.items = this.basketService.getBasketItems();
  }

  public onRefuse(item: BasketItem) {
    this.basketService.removeItem(item);
  }
}
