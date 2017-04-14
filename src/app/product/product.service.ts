import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Product } from './product';
import { ProductCategory } from './product-category.enum';

@Injectable()
export class ProductService {

    private products: BehaviorSubject<Product[]> = new BehaviorSubject([
        new Product('apple', 'green', 1.5, ProductCategory.Food, true),
        new Product('shirt', 'white', 15.99, ProductCategory.Closes, true),
        new Product('cooking', 'tasty', 50, ProductCategory.Service, false)
    ]);

    getAllProducts(): Observable<Product[]> {
        return this.products.asObservable();
    }
}
