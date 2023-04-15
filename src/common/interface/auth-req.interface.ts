import { Request } from 'express';

import { SecureUsersDocument } from '@users';

export interface AuthenticatedReq extends Request {
  /**
   * The user that is authenticated.
   */
  user: SecureUsersDocument;
}
