import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { BasketCachingService, MenuService } from 'common/services';
import { BasketItem, MenuItem } from 'common/models';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  public menuItem: MenuItem;
  public itemsCount: number;
  public totalAmount: number;

  public constructor(
    private basketService: BasketCachingService,
    private menuService: MenuService
  ) { }

  public ngOnInit() {
    this.menuService.checkout.subscribe(item => {
      this.menuItem = item;
    });
    this.basketService.getItems().subscribe(items => {
      this.itemsCount = items.map(item => item.quantity).reduce(this.sum, 0);
      this.totalAmount = items.map(item => item.totalPrice).reduce(this.sum, 0);
    });
  }

  private sum(total: number, amount: number): number {
    return Math.round((total + amount) * 100) / 100;
  }
}
