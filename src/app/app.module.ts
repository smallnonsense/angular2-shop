import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';

import { AppComponent } from './app.component';
import { ProductCartPipe } from './shared/product-cart.pipe';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, ProductCartPipe],
  imports: [BrowserModule, FormsModule, HttpModule, CartModule, ProductModule],
  providers: []
})
export class AppModule { }
