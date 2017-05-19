import { Component, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  @Input()
  public title = 'Cart';
  @Input()
  public items: Observable<BasketItem[]> = null;

  constructor() { }

  ngOnInit() {
  }

}