import { Injectable } from '@angular/core';

@Injectable()
export class InfoService {

  public get() {
    return { app: 'i-Shop', ver: '1.0' };
  }
}
