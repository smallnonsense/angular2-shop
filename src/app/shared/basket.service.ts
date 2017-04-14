import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { BasketItem } from '../shared/basket-item';

@Injectable()
export class BasketService {

    private baskets: BehaviorSubject<BasketItem[]> = new BehaviorSubject([]);

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
    }

    removeItem(item: BasketItem) {
        const updatedBasket = this.baskets.getValue()
            .filter(i => i !== item)
            .filter(i => i.name !== item.name);
        this.baskets.next(updatedBasket);
    }
}
