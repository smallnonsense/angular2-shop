import { Injectable } from '@angular/core';
import { Product } from './product';
import { ProductCategory } from './product-category.enum';

@Injectable()
export class ProductService {
  //constructor() { }

	getAllProducts() : Product[] {
		return [
			new Product('apple', 'green', 1.5, ProductCategory.Food, true),
			new Product('shirt', 'white', 15.99, ProductCategory.Closes, true),
			new Product('cooking', 'tasty', 50, ProductCategory.Service, false)
		]
	}
}
