import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  private notSupportedMessage = 'Web Storage doesn\'t supported';

  constructor() {
    if (!localStorage) {
      console.log('StorageService won\'t work properly. ' + this.notSupportedMessage);
    }
  }

  public getItem(key: string) {
    if (!localStorage) {
      console.log(`Can't get item '${key}'. ` + this.notSupportedMessage);
      return null;
    }
    const data = localStorage.getItem(key);
    console.log(`fetched data ('${key}','${data}')`);
    return data;
  }
  public setItem(key: string, data: string) {
    if (!localStorage) {
      console.log(`Can't set item ('${key}', '${data}'). ` + this.notSupportedMessage);
    }
    localStorage.setItem(key, data);
    console.log(`persisted data ('${key}','${data}')`);
  }
}
