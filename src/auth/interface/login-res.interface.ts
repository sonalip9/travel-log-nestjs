export interface LoginResponse {
  /**
   * The access token for the user. This token is used for authentication.
   */
  accessToken: string;

  /**
   * The number of seconds until the access token expires.
   * @example 3600
   */
  expiresIn: number;

  /**
   * The authenticated user's data.
   */
  user: {
    /**
     * The user's ID.
     * @example '5f9f1c9c0b9b9c0b9b9c0b9b'
     */
    id: string;

    /**
     * The user's username. The email address used for authentication.
     * @example 'abc@example.com'
     */
    username: string;
  };
}
