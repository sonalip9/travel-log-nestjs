export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  user: {
    id: string;
    username: string;
  };
}
