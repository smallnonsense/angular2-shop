import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AuthService, User } from 'app/auth';
import { StorageService } from 'app/common'

import { BasketService, BasketItem } from './';

@Injectable()
export class BasketCachingService {

  private baskets: BehaviorSubject<BasketItem[]> = new BehaviorSubject([]);
  private storageKey: string;

  public constructor(
    private service: BasketService,
    private authService: AuthService) {
    authService.observableUser.subscribe(() => this.refresh());
  }

  public getItems(): Observable<BasketItem[]> {
    return this.baskets.asObservable();
  }

  public addItem(newItem: BasketItem) {
    this.service.addItem(newItem);
    this.refresh();
  }

  public removeItem(item: BasketItem) {
    this.service.removeItem(item);
    this.refresh();
  }

  private refresh() {
    this.baskets.next(
      this.service.getItems())
  }
}
