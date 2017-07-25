import { UserClaim } from './';

export interface User {
  id: string;
  fullName: string;
  email: string;
  claims: UserClaim[];
}
