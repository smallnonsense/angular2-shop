import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AuthService, User } from 'app/auth';
import { StorageService } from 'app/common/storage.service'

import { BasketItem } from './basket-item';

@Injectable()
export class BasketService {

  private baskets: BehaviorSubject<BasketItem[]> = new BehaviorSubject([]);
  private storageKey: string;

  public constructor(
    private storage: StorageService,
    private authService: AuthService) {
    authService.observableUser.subscribe(user => this.restore(user));
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
    this.storage.setItem(this.storageKey, data);
  }

  public removeItem(item: BasketItem) {
    const updatedBasket = this.baskets.getValue()
      .filter(i => i !== item)
      .filter(i => i.name !== item.name);
    this.baskets.next(updatedBasket);

    const data = JSON.stringify(updatedBasket);
    this.storage.setItem(this.storageKey, data);
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }

  private restore(user: User) {
    const newUser = user || this.authService.guest;
    this.storageKey = newUser.id + '.baskets';

    const data = this.storage.getItem(this.storageKey);
    if (!data) {
      this.baskets.next([]);
      return;
    }
    const basketData = (JSON.parse(data) as Array<any>);
    const basketItems = basketData.map(item => new BasketItem(
      item.name,
      parseInt(item.quantity, 0),
      parseFloat(item.totalPrice)));
    this.baskets.next(basketItems);
  }
}
