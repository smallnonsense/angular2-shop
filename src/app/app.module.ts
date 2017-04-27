import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CartModule } from 'app/cart/cart.module';
import { ProductModule } from 'app/product/product.module';
import { CommonModule } from 'app/common/common.module';

import { AppComponent } from 'app/app.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpModule, CartModule, ProductModule, CommonModule],
  providers: [],
  exports: []
})
export class AppModule { }
