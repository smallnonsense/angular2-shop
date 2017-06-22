import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { StorageService } from 'app/common';

import { User } from './user';

@Injectable()
export class AuthService {

  private authUser = new BehaviorSubject<User>(null);

  constructor(private storageService: StorageService) {
    const user: User = JSON.parse(this.storageService.getItem('user'));
    if (user !== null) {
      this.authUser.next(user);
    }
  }

  public authorizedUser() {
    return this.authUser.asObservable();
  }

  public authorize(login: string, password: string) {
    const user: User = { id: '1', fullName: login, permissions: ['admin'] };
    this.storageService.setItem('user', JSON.stringify(user))
    this.authUser.next(user);
  }
}
