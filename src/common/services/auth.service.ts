import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { InstanceManager, } from 'common/annotations';
import { User, UserClaims } from 'common/models';

import { StorageService } from './storage.service';

@Injectable()
export class AuthService {
  private authUser = new BehaviorSubject<User>(this.guest);

  constructor(private storage: StorageService) {
    InstanceManager.track();
    this.restore(storage);
  }

  public get observableUser() {
    return this.authUser.asObservable();
  }
  public get user() {
    return this.authUser.value;
  }
  public get guest(): User {
    return { id: 'guest', fullName: 'Guest', email: null, claims: ['products', 'cart'] };
  }
  public logIn(email: string, password: string) {
    const claims: UserClaims = ['known', 'products', 'cart', 'checkout', 'cabinet', 'users'];
    const user: User = { id: this.newId(), fullName: email, email: email, claims: claims };
    this.setUser(user);
  }
  public logInAsAdministrator(email: string, password: string) {
    const claims: UserClaims = ['known', 'products', 'admin'];
    const user: User = { id: this.newId(), fullName: email, email: email, claims: claims };
    this.setUser(user);
  }
  public refresh() {
    this.restore(this.storage);
  }
  public logOff() {
    this.setUser(null);
  }

  private restore(storage: StorageService) {
    const object = JSON.parse(storage.getItem('user'));
    if (!object) {
      return;
    }
    const user: User = { ...object };
    this.authUser.next(user);
  }
  private setUser(user: User) {
    this.storage.setItem('user', JSON.stringify(user))
    this.authUser.next(user || this.guest);
  }
  private newId() {
    const latestId = this.storage.getItem('latestId');
    const id = (+latestId + 1).toString();
    this.storage.setItem('latestId', id);
    return id;
  }
}
