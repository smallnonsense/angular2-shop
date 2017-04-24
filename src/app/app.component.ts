import {
  Component, SimpleChanges, AfterViewInit, Input, ViewChild,
  OnInit, OnDestroy, OnChanges, DoCheck, AfterContentChecked
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ProductListComponent } from 'app/product/product-list/product-list.component';
import { CartListComponent } from 'app/cart/cart-list/cart-list.component';

import { ProductService } from 'app/product/product.service';
import { Product } from 'app/product/product';
import { BasketService } from 'app/shared/basket.service';
import { BasketItem } from 'app/shared/basket-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService, BasketService]
})
export class AppComponent
  implements OnChanges, OnInit, DoCheck, AfterContentChecked, OnDestroy {

  public title = 'Shop is open!';
  @ViewChild(ProductListComponent) public productsChild: ProductListComponent;
  @ViewChild(CartListComponent) public cartChild: CartListComponent;

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
    console.log('AppComponent.OnInit: Object setup');
  }
  ngDoCheck(): void {
    console.log('AppComponent.DoCheck: Something has changed');
  }
  ngAfterContentChecked(): void {
    console.log('AppComponent.AfterContentChecked: ViewChild sync');
    this.productsChild.products = this.productService.getAllProducts();
    this.cartChild.items = this.basketService.getBasketItems();
  }
  ngOnDestroy(): void {
    console.log('AppComponent.DoDestroy: Object cleanup');
  }
}
