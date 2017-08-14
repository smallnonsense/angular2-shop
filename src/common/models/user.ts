import { UserClaims } from './user-claim';

export interface User {
  id: string;
  fullName: string;
  email: string;
  claims: UserClaims;
}
