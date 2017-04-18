import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ProductService } from './product/product.service';
import { Product } from './product/product';
import { BasketService } from './shared/basket.service';
import { BasketItem } from './shared/basket-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService, BasketService]
})
export class AppComponent implements OnInit {

    public title = 'Shop is open!';
    @Output() public products: Observable<Product[]>;
    @Output() public cartItems: Observable<BasketItem[]>;

  constructor(
    private productService: ProductService,
    private basketService: BasketService) { }

  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
    this.cartItems = this.basketService.getBasketItems();
  }
}
