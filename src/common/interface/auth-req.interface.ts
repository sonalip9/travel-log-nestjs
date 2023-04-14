import { Request } from 'express';

import { SecureUsersDocument } from '@users';

export interface AuthenticatedReq extends Request {
  user: SecureUsersDocument;
}
