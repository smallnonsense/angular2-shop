import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { InstanceManager } from 'common/annotations'
import { Product, ProductCategory } from 'common/models'

import { StorageService } from './storage.service'

@Injectable()
export class ProductService {

  private products: BehaviorSubject<Product[]> = new BehaviorSubject([]);

  public constructor(private storage: StorageService) {
    this.restore(storage);
    InstanceManager.track();
  }

  public getAllProducts(): Observable<Product[]> {
    return this.products.asObservable();
  }

  private restore(storage: StorageService) {
    const data = storage.getItem('products');
    if (!data) {
      this.products.next([
        new Product('apple', 'green', 1.5, ProductCategory.Food, true),
        new Product('shirt', 'white', 15.99, ProductCategory.Closes, true),
        new Product('cooking', 'tasty', 50, ProductCategory.Service, false)
      ]);
      this.storage.setItem('products', JSON.stringify(this.products.getValue()));
    } else {
      const products = (JSON.parse(data) as Array<any>)
      .map(item => new Product(
        item.name,
        item.description,
        parseFloat(item.price),
        <ProductCategory>item.categoryType,
        <boolean>item.isAvailable))
      this.products.next(products);
    }
  }
}
