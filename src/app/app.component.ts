import { Component, OnInit, OnDestroy, OnChanges, DoCheck, SimpleChanges, Input, Output } from '@angular/core';
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
export class AppComponent
  implements OnChanges, OnInit, DoCheck, OnDestroy {

    public title = 'Shop is open!';
    @Output() public products: Observable<Product[]>;
    @Output() public cartItems: Observable<BasketItem[]>;

  constructor(
    private productService: ProductService,
    private basketService: BasketService) {
    console.log('AppComponent ctor');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('AppComponent.OnChanges: '
      + changes['cartItems'].previousValue + ' -> '
      + changes['cartItems'].currentValue);
  }
  ngOnInit() {
    this.products = this.productService.getAllProducts();
    this.cartItems = this.basketService.getBasketItems();
    console.log('AppComponent.OnInit: Object setup');
  }
  ngDoCheck(): void {
    console.log('AppComponent.DoCheck: Something has changed');
  }
  ngOnDestroy(): void {
    console.log('AppComponent.DoDestroy: Object cleanup');
  }
}
