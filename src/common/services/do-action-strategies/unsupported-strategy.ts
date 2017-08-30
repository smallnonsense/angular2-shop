import { DoActionStrategy } from './do-action-strategy';
import { Injectable } from '@angular/core';

@Injectable()
export class UnsupportedStrategy implements DoActionStrategy {

  public constructor(private action: string) { }

  public do() {
    console.error(`Unsupported operation '${this.action}'. Ignoring.`);
  }
}
