import { Component } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
	providers: [ProductService, BasketService]
})
export class AppComponent {

  public title = 'Shop is open!';
	public products : Product[];
	
	constructor(
		private productService : ProductService,
		private basketService : BasketService) {
		this.products = productService.getAllProducts();
	}
	
	add(product : Product) {
		this.basketService.addProduct(product);
	}
}
