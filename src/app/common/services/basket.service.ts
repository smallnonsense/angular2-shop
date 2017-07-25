import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { StorageService, InstanceManager, AuthService, User, BasketItem } from 'app/common/services';

@Injectable()
export class BasketService {

  public constructor(
    private storage: StorageService,
    private authService: AuthService) {
    InstanceManager.track();
  }

  public getItems(): BasketItem[] {
    return this.get(this.storageKey);
  }

  public addItem(newItem: BasketItem) {
    const key = this.storageKey;
    const items = this.get(key)
    const olditem = items.filter(i => i.name === newItem.name)[0];
    if (!olditem) {
      const newItems = items.concat([newItem]);
      this.set(key, newItems);
      return;
    }
    olditem.quantity = olditem.quantity + newItem.quantity;
    olditem.totalPrice = this.round(olditem.quantity * newItem.totalPrice);
    this.set(key, items);
  }

  public removeItem(item: BasketItem) {
    const key = this.storageKey;
    const newItems = this.get(key)
      .filter(i => i !== item)
      .filter(i => i.name !== item.name);
    this.set(key, newItems);
  }

  private get storageKey(): string {
    const user = this.authService.user || this.authService.guest;
    return `${user.id}.baskets`;
  };
  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
  private get(key: string): BasketItem[] {
    const data = this.storage.getItem(key);
    if (!data) {
      return [];
    }
    const basketData = JSON.parse(data) as Array<any>;
    if (!basketData) {
      return [];
    }
    const basketItems = basketData.map(item => new BasketItem(
      item.name,
      parseInt(item.quantity, 0),
      parseFloat(item.totalPrice)));
    return basketItems;
  }
  private set(key: string, items: BasketItem[]) {
    const data = JSON.stringify(items);
    this.storage.setItem(key, data);
  }
}
