import { Component, OnInit, OnDestroy, OnChanges, DoCheck, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Product } from 'app/product/product';
import { ProductService } from 'app/product/product.service';

import { BasketItem } from 'app/common/basket-item';
import { BasketService } from 'app/common/basket.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent
  implements OnChanges, OnInit, DoCheck, OnDestroy {

  @Input() public title = 'Products available';
  @Input() public products: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private basketService: BasketService) {
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

  buy(product: Product) {
    const item = new BasketItem(product.name, 1, product.price);
    this.basketService.addItem(item);
  }
}
