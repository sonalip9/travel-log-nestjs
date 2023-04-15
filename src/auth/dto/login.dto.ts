import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  /**
   * The password of the user for authentication.
   * @example 'password'
   */
  @IsString()
  @IsNotEmpty()
  password: string;

  /**
   * The email of the user for authentication.
   * @example 'abc@example.com'
   */
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  username: string;
}
