import { Pipe, PipeTransform } from '@angular/core';

import { Product } from 'app/product/product';
import { BasketItem } from 'app/cart/basket-item';

@Pipe({
  name: 'toCart'
})
export class ProductCartPipe implements PipeTransform {

  public transform(product: Product, args?: any): BasketItem {
    return new BasketItem(product.name, 1, product.price);
  }
}
