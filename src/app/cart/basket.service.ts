import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { StorageService } from 'app/common/storage.service'

import { BasketItem } from './basket-item';

@Injectable()
export class BasketService {

  private baskets: BehaviorSubject<BasketItem[]> = new BehaviorSubject([]);

  public constructor(private storage: StorageService) {
    const data = storage.getItem('baskets');
    if (data) {
      this.baskets.next((JSON.parse(data) as Array<any>)
        .map(item => new BasketItem(
          item.name,
          parseInt(item.quantity, 0),
          parseFloat(item.totalPrice))));
    }
  }

  public getBasketItems(): Observable<BasketItem[]> {
    return this.baskets.asObservable();
  }

  public addItem(newItem: BasketItem) {
    const items = this.baskets.getValue();
    const olditem = items.filter(i => i.name === newItem.name)[0];
    if (olditem) {
      olditem.quantity = olditem.quantity + newItem.quantity;
      olditem.totalPrice = this.round(olditem.quantity * newItem.totalPrice);
      this.baskets.next(items);
    } else {
      const newItems = items.concat([newItem]);
      this.baskets.next(newItems);
    }

    const data = JSON.stringify(this.baskets.getValue());
    this.storage.setItem('baskets', data);
  }

  public removeItem(item: BasketItem) {
    const updatedBasket = this.baskets.getValue()
      .filter(i => i !== item)
      .filter(i => i.name !== item.name);
    this.baskets.next(updatedBasket);

    const data = JSON.stringify(updatedBasket);
    this.storage.setItem('baskets', data);
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
