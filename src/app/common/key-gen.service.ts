import { Injectable, Inject, Optional, OpaqueToken } from '@angular/core';

export const KeygenLength = new OpaqueToken('KeygenLength');

@Injectable()
export class KeyGenService {

  constructor(
    @Optional() @Inject(KeygenLength)
    private keyLength: number = 10
    ) { }

  public gen(): string {
    return Math.random().toString(36).substring(this.keyLength);
  }
}
