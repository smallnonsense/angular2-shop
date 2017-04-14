import { Component } from '@angular/core';

import { ProductService } from './product/product.service';
import { BasketService } from './shared/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService, BasketService]
})
export class AppComponent {
    public title = 'Shop is open!';
}
