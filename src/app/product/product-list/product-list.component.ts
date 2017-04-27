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

  @Input() public title = 'Products available';
  @Input() public products: Observable<Product[]>;
  @Output() public buy = new EventEmitter<Product>();

  constructor() {
    console.log('ProductListComponent ctor');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  ngOnInit() {
    console.log('ProductListComponent.OnInit: Object setup');
  }
  ngDoCheck(): void {
    console.log('ProductListComponent.DoCheck: Something has changed');
  }
  ngOnDestroy(): void {
    console.log('ProductListComponent.DoDestroy: Object cleanup');
  }

  onBuy(product: Product) {
    this.buy.emit(product);
  }
}
