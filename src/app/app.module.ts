import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CartModule } from 'app/cart/cart.module';
import { ProductModule } from 'app/product/product.module';

import { AppComponent } from 'app/app.component';
import { ProductCartPipe } from 'app/shared/product-cart.pipe';
import { HoverDirective } from 'app/shared/hover.directive';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, ProductCartPipe, HoverDirective],
  imports: [BrowserModule, FormsModule, HttpModule, CartModule, ProductModule],
  providers: [],
  exports: [HoverDirective]
})
export class AppModule { }
