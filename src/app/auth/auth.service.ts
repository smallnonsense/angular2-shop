import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from './user';

@Injectable()
export class AuthService {

  private authUser = new BehaviorSubject<User>(null);

  constructor() { }

  public authorizedUser() {
    return this.authUser.asObservable();
  }
  public authorize(user: User) {
    this.authUser.next(user);
  }
}
