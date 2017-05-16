import {
  Component, SimpleChanges, AfterViewInit, Input, ViewChild, Optional,
  OnInit, OnDestroy, OnChanges, DoCheck, AfterContentChecked
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { InfoService } from 'app/common/info.service';
import { ProductService } from 'app/product/product.service';
import { Product } from 'app/product/product';
import { BasketService } from 'app/cart/basket.service';
import { BasketItem } from 'app/cart/basket-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService, BasketService]
})
export class AppComponent
  implements OnChanges, OnInit, DoCheck, AfterContentChecked, OnDestroy {

  public title = 'Wellcome to the shop!';
  public basketItems: Observable<BasketItem[]>;
  public products: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private basketService: BasketService,
    @Optional()
    private infoService: InfoService) {
    // console.log('AppComponent ctor');
  }

  public onBuy(product: Product) {
    const item = new BasketItem(product.name, 1, product.price);
    this.basketService.addItem(item);
  }
  public onRefuse(item: BasketItem) {
    this.basketService.removeItem(item);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('AppComponent.OnChanges: '
    //   + changes['cartItems'].previousValue + ' -> '
    //   + changes['cartItems'].currentValue);
  }
  ngOnInit() {
    // console.log('AppComponent.OnInit: Object setup');
    if (this.infoService) {
      const info = this.infoService.get();
      this.title = `${info.app} v${info.ver}`;
    }
    this.products = this.productService.getAllProducts();
    this.basketItems = this.basketService.getBasketItems();
  }
  ngDoCheck(): void {
    // console.log('AppComponent.DoCheck: Something has changed');
  }
  ngAfterContentChecked(): void {
    // console.log('AppComponent.AfterContentChecked: ViewChild sync');
  }
  ngOnDestroy(): void {
    // console.log('AppComponent.DoDestroy: Object cleanup');
  }
}
