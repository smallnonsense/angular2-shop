import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { StorageService } from 'app/common';

import { UserClaim } from './user-claim.enum';
import { User } from './user';

@Injectable()
export class AuthService {

  private authUser = new BehaviorSubject<User>(this.guest);

  constructor(private storage: StorageService) {
    this.restore(storage);
  }

  public get observableUser() {
    return this.authUser.asObservable();
  }
  public get user() {
    return this.authUser.value;
  }
  public get guest(): User {
    return { id: 'guest', fullName: 'Guest', email: null, claims: [UserClaim.Products, UserClaim.Cart] };
  }
  public logIn(email: string, password: string) {
    const claims = [UserClaim.Trusted, UserClaim.Products, UserClaim.Cart];
    const user: User = { id: email, fullName: email, email: email, claims: claims };
    this.setUser(user);
  }
  public logInAsAdministrator(email: string, password: string) {
    const claims = [UserClaim.Trusted, UserClaim.Products, UserClaim.Admin];
    const user: User = { id: '1', fullName: email, email: email, claims: claims };
    this.setUser(user);
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
}
