import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Product } from './product';
import { BasketItem } from './basket-item';

@Injectable()
export class BasketService {

    private basket: BehaviorSubject<BasketItem[]> = new BehaviorSubject([]);

    getBasketItems(): Observable<BasketItem[]> {
        return this.basket.asObservable();
    }

    addProduct(product: Product) {
        const items = this.basket.getValue();
        const item = items.filter(i => i.name === product.name)[0];
        if (item) {
            item.quantity = item.quantity + 1;
            item.totalPrice = item.quantity * product.price;
        } else {
            const newItem = new BasketItem(product.name, 1, 1 * product.price);
            const newItems = items.concat([newItem]);
            this.basket.next(newItems);
        }
    }

    removeItem(item: BasketItem) {
        const updatedBasket = this.basket.getValue()
            .filter(i => i !== item)
            .filter(i => i.name !== item.name);
        this.basket.next(updatedBasket);
    }
}
