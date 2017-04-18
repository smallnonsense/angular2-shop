import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../product/product';
import { BasketItem } from './basket-item';

@Pipe({
  name: 'toCart'
})
export class ProductCartPipe implements PipeTransform {

  transform(product: Product, args?: any): BasketItem {
    return new BasketItem(product.name, 1, product.price);
  }
}
