import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { StorageService } from 'app/common/storage.service'

import { Product } from './product';
import { ProductCategory } from './product-category.enum';

@Injectable()
export class ProductService {

  private products: BehaviorSubject<Product[]> = new BehaviorSubject([]);

  public constructor(private storage: StorageService) {
    const data = storage.getItem('products');
    if (!data) {
      this.products.next([
        new Product('apple', 'green', 1.5, ProductCategory.Food, true),
        new Product('shirt', 'white', 15.99, ProductCategory.Closes, true),
        new Product('cooking', 'tasty', 50, ProductCategory.Service, false)
      ]);
      this.storage.setItem('products', JSON.stringify(this.products.getValue()));
    } else {
      this.products.next((JSON.parse(data) as Array<any>)
      .map(item => new Product(
        item['name'],
        item['description'],
        parseFloat(item['price']),
        <ProductCategory>item['categoryType'],
        <boolean>item['isAvailable'])));
    }
  }

  public getAllProducts(): Observable<Product[]> {
    return this.products.asObservable();
  }
}
