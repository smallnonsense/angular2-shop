import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { BasketCachingService } from 'common/services';
import { BasketItem } from 'common/models';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  public itemsCount: Observable<number>;
  public totalAmount: Observable<number>;

  public constructor(private service: BasketCachingService) { }

  public ngOnInit() {
    const basketItems: Observable<BasketItem[]> = this.service.getItems();
    this.itemsCount = basketItems.map(items =>
      items.map(item => item.quantity).reduce(this.sum, 0));
    this.totalAmount = basketItems.map(items =>
      items.map(item => item.totalPrice).reduce(this.sum, 0));
  }

  private sum(total: number, amount: number): number {
    return Math.round((total + amount) * 100) / 100;
  }
}