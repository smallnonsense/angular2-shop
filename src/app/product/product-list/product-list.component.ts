import {
  Component, Input, Output,
  OnInit, OnDestroy, OnChanges, DoCheck, SimpleChanges,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Product } from 'app/product/product';
import { ProductService } from 'app/product/product.service';

import { BasketItem } from 'app/cart/basket-item';
import { BasketService } from 'app/cart/basket.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent
  implements OnChanges, OnInit, DoCheck, OnDestroy {

  @Input()
  public title = 'Products available';
  @Input()
  public products: Observable<Product[]> = null;
  @Output()
  public buy = new EventEmitter<Product>();

  public constructor() {
    // console.log('ProductListComponent ctor');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  public ngOnInit() {
    // console.log('ProductListComponent.OnInit: Object setup');
  }
  public ngDoCheck(): void {
    // console.log('ProductListComponent.DoCheck: Something has changed');
  }
  public ngOnDestroy(): void {
    // console.log('ProductListComponent.DoDestroy: Object cleanup');
  }

  public onBuy(product: Product) {
    this.buy.emit(product);
  }
}
