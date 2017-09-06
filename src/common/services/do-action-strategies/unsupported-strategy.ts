import { DoActionStrategy } from './do-action-strategy';
import { Injectable } from '@angular/core';

@Injectable()
export class UnsupportedStrategy implements DoActionStrategy {

  public constructor(private action: string) { }

  public do() {
    if (!this.action) {
      console.error(`Operation '${this.action}' wan\'t resolved properly. Ignoring.`);
    } else {
      console.error(`Unsupported operation '${this.action}'. Ignoring.`);
    }
  }
}
