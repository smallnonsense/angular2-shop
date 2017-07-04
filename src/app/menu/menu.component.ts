import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AuthService, UserClaim } from 'app/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public showCart: Observable<boolean>;
  public showProducts: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const user = this.authService.observableUser;
    const isAdmin = user.map(u => u.claims.includes(UserClaim.Admin));
    const hasCart = user.map(u => u.claims.includes(UserClaim.Cart));
    const hasProducts = user.map(u => u.claims.includes(UserClaim.Products));
    this.showCart = hasCart;
    this.showProducts = hasProducts;
  }
}
