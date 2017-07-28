import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { InstanceManager,  } from 'common/annotations';
import { User, UserClaim } from 'common/models';

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
    return { id: 'guest', fullName: 'Guest', email: null, claims: [UserClaim.products, UserClaim.cart] };
  }
  public logIn(email: string, password: string) {
    const claims = [UserClaim.known, UserClaim.products, UserClaim.cart, UserClaim.checkout, UserClaim.cabinet, UserClaim.users];
    const user: User = { id: this.newId(), fullName: email, email: email, claims: claims };
    this.setUser(user);
  }
  public logInAsAdministrator(email: string, password: string) {
    const claims = [UserClaim.known, UserClaim.products, UserClaim.admin];
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
    const user: User = {
      id: object.id,
      fullName: object.fullName,
      email: object.email,
      claims: (object.claims as Array<any>).map(claim => <UserClaim>claim)
    };
    this.authUser.next(user);
  }
  private setUser(user: User) {
    this.storage.setItem('user', JSON.stringify(user))
    this.authUser.next(user || this.guest);
  }
  private newId() {
    const latestId = this.storage.getItem('latestId');
    const id = (+latestId).toString();
    this.storage.setItem('latestId', id);
    return id;
  }
}
