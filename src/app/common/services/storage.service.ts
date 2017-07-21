import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  private static notSupportedMessage = 'Web Storage doesn\'t supported';
  private static count = 0;
  constructor() {
    if (!localStorage) {
      console.log('StorageService won\'t work properly. ' + StorageService.notSupportedMessage);
    }
    console.warn(`StorageService ${StorageService.count++}`);
  }

  public getItem(key: string) {
    if (!localStorage) {
      console.warn(`Can't get item '${key}'. ` + StorageService.notSupportedMessage);
      return null;
    }
    const data = localStorage.getItem(key);
    return data;
  }
  public setItem(key: string, data: string) {
    if (!localStorage) {
      console.warn(`Can't set item ('${key}', '${data}'). ` + StorageService.notSupportedMessage);
      return;
    }
    localStorage.setItem(key, data);
  }
}
