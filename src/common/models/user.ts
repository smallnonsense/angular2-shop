import { UserClaim } from './user-claim.enum';

export interface User {
  id: string;
  fullName: string;
  email: string;
  claims: UserClaim[];
}
