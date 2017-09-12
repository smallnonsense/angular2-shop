import { Observable } from 'rxjs/Rx';

import { Url } from './url';

export interface NavigationState {
  requested: Observable<Url>,
  navigated: Observable<Url>,
  system: Observable<Url>
}
