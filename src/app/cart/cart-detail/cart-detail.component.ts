import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/reduce';

import { BasketItem, BasketService } from 'app/cart';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  public itemsCount: Observable<number>;
  public totalAmount: Observable<number>;

  public constructor(private basketService: BasketService) { }

  public ngOnInit() {
    const basketItems: Observable<BasketItem[]> = this.basketService.getBasketItems();
    this.itemsCount = basketItems.map(items => items.length);
    // comment: RX.Objervable.reduce doesn't work for some reason.
    // this.totalAmount = basketItems.flatMap((items, index) => items)
    //   .map(item => item.totalPrice)
    //   .reduce((total, amount, index) => {
    //     console.log(`${index}: ${total}+${amount}=${total + amount}`);
    //     return total + amount;
    //   }, 0);
    this.totalAmount = basketItems
      .map(items => items.map(item => item.totalPrice).reduce(this.sum, 0));
  }

  private sum(total: number, amount: number): number {
    return Math.round((total + amount) * 100) / 100;
  }
}
