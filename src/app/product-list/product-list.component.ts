import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '../product';
import { BasketItem } from '../basket-item';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public basket: Observable<BasketItem[]>;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basket = this.basketService.getBasketItems();
  }

  remove(item: BasketItem) {
    this.basketService.removeItem(item);
  }
}
