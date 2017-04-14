import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BasketItem } from '../../shared/basket-item';
import { BasketService } from '../../shared/basket.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  public title = 'Cart';
  public items: Observable<BasketItem[]>;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.items = this.basketService.getBasketItems();
  }

  drop(item: BasketItem) {
    this.basketService.removeItem(item);
  }
}
