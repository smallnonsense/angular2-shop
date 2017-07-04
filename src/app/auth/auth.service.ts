import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { StorageService } from 'app/common';

import { UserClaim } from './user-claim.enum';
import { User } from './user';

@Injectable()
export class AuthService {

  private authUser = new BehaviorSubject<User>(this.guest);

  constructor(private storageService: StorageService) {
    const object = JSON.parse(this.storageService.getItem('user'));
    if (object !== null) {
      const user: User = {
        id: object.id,
        fullName: object.fullName,
        email: object.email,
        claims: (object.claims as Array<any>).map(claim => <UserClaim>claim)
      };
      this.authUser.next(user);
    }
  }

  public get observableUser() {
    return this.authUser.asObservable();
  }
  public get user() {
    return this.authUser.value;
  }
  public get guest(): User {
    return { id: '0', fullName: 'Guest', email: null, claims: [UserClaim.Products, UserClaim.Cart] };
  }
  public logIn(email: string, password: string) {
    const claims = [UserClaim.Trusted, UserClaim.Products, UserClaim.Cart];
    const user: User = { id: '1', fullName: email, email: email, claims: claims };
    this.setUser(user);
  }
  public logInAsAdministrator(email: string, password: string) {
    const claims = [UserClaim.Trusted, UserClaim.Products, UserClaim.Admin];
    const user: User = { id: '2', fullName: email, email: email, claims: claims };
    this.setUser(user);
  }
  public logOff() {
    this.setUser(null);
  }

  private setUser(user: User) {
    this.storageService.setItem('user', JSON.stringify(user))
    this.authUser.next(user || this.guest);
  }
}
