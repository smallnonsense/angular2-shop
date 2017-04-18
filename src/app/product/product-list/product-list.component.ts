import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { BasketItem } from '../../shared/basket-item';
import { BasketService } from '../../shared/basket.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() public title = 'Products available';
  @Input() public products: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private basketService: BasketService) { }

  ngOnInit() {
    // this.products = this.productService.getAllProducts();
  }

  buy(product: Product) {
    const item = new BasketItem(product.name, 1, product.price);
    this.basketService.addItem(item);
  }
}
