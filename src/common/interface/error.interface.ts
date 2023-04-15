export class Error {
  /**
   * The error that occurred.
   */
  error?: string;

  /**
   * The message(s) that describe the error.
   */
  message?: string | string[];

  /**
   * The status code of the error.
   */
  statusCode: number;
}
