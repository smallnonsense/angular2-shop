import {
  Component, Input, Output, HostBinding, HostListener,
  OnInit, OnDestroy, OnChanges, DoCheck, SimpleChanges,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BasketItem } from 'app/cart/basket-item';
import { BasketService } from 'app/cart/basket.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent
  implements OnChanges, OnInit, DoCheck, OnDestroy {

  @Input() public title = 'Cart';
  @Input() public items: Observable<BasketItem[]>;
  @Output() public remove = new EventEmitter<BasketItem>();

  constructor(private basketService: BasketService) {
    console.log('CartListComponent ctor');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  ngOnInit() {
    console.log('CartListComponent.OnInit: Object setup');
  }
  ngDoCheck(): void {
    console.log('CartListComponent.DoCheck: Something has changed');
  }
  ngOnDestroy(): void {
    console.log('CartListComponent.DoDestroy: Object cleanup');
  }
  onRemove(item: BasketItem) {
    this.remove.emit(item);
  }
}
