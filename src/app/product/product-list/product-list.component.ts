import { Component, OnInit, OnDestroy, OnChanges, DoCheck, Input, SimpleChanges } from '@angular/core';
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
