import { Injectable } from '@angular/core';

@Injectable()
export class InfoService {

  constructor() { }

  public get() {
    return { App: 'TaskManager', Ver: '1.0' };
  }
}
