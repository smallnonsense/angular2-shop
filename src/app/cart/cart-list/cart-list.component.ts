import {
  Component, Input, Output, HostBinding, HostListener,
  OnInit, OnDestroy, OnChanges, DoCheck, SimpleChanges,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BasketItem } from 'app/cart/basket-item';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent
  implements OnChanges, OnInit, DoCheck, OnDestroy {

  @Input()
  public title = 'Cart';
  @Input()
  public items: Observable<BasketItem[]> = null;
  @Output()
  public remove = new EventEmitter<BasketItem>();

  public constructor() {
    // console.log('CartListComponent ctor');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  public ngOnInit() {
    // console.log('CartListComponent.OnInit: Object setup');
  }
  public ngDoCheck(): void {
    // console.log('CartListComponent.DoCheck: Something has changed');
  }
  public ngOnDestroy(): void {
    // console.log('CartListComponent.DoDestroy: Object cleanup');
  }
  public onRemove(item: BasketItem) {
    this.remove.emit(item);
  }
}
