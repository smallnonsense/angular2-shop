import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { StorageService } from 'app/common/storage.service'

import { BasketItem } from './basket-item';

@Injectable()
export class BasketService {

  private baskets: BehaviorSubject<BasketItem[]> = new BehaviorSubject([]);

  constructor(private storage: StorageService) {
    const data = storage.getItem('baskets');
    if (data) {
      this.baskets.next((JSON.parse(data) as Array<any>)
        .map(item => new BasketItem(
          item.name,
          parseInt(item.quantity, 0),
          parseFloat(item.totalPrice))));
    }
  }

  getBasketItems(): Observable<BasketItem[]> {
    return this.baskets.asObservable();
  }

  addItem(newItem: BasketItem) {
    const items = this.baskets.getValue();
    const olditem = items.filter(i => i.name === newItem.name)[0];
    if (olditem) {
      olditem.quantity = olditem.quantity + newItem.quantity;
      olditem.totalPrice = olditem.quantity * newItem.totalPrice;
    } else {
      const newItems = items.concat([newItem]);
      this.baskets.next(newItems);
    }

    const data = JSON.stringify(this.baskets.getValue());
    this.storage.setItem('baskets', data);
  }

  removeItem(item: BasketItem) {
    const updatedBasket = this.baskets.getValue()
      .filter(i => i !== item)
      .filter(i => i.name !== item.name);
    this.baskets.next(updatedBasket);

    const data = JSON.stringify(updatedBasket);
    this.storage.setItem('baskets', data);
  }
}
