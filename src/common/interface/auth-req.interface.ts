import { Request } from 'express';

import { UsersDocument } from '@users';

export interface AuthenticatedReq extends Request {
  user: Omit<UsersDocument, 'password'>;
}
