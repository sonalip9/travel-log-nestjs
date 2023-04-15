export class Error {
  /**
   * The error that occurred.
   * @example 'Internal Error'
   */
  error?: string;

  /**
   * The message(s) that describe the error.
   * @example 'Something went wrong!'
   */
  message?: string | string[];

  /**
   * The status code of the error.
   * @example 500
   */
  statusCode: number;
}
