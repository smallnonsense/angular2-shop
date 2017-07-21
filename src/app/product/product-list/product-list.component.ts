import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Product, ProductService } from 'app/product';
import { BasketItem, BasketCachingService } from 'app/cart';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input()
  public title = 'Products available';

  public products: Observable<Product[]>;

  public constructor(
    private productService: ProductService,
    private basketService: BasketCachingService) { }

  public ngOnInit() {
    this.products = this.productService.getAllProducts();
  }

  public onBuy(product: Product) {
    const item = new BasketItem(product.name, 1, product.price);
    this.basketService.addItem(item);
  }
}
