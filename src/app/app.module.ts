import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CartModule } from './cart/cart.module';

import { AppComponent } from './app.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCartPipe } from './shared/product-cart.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCartPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CartModule,
  ],
  exports: [
    ProductListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
