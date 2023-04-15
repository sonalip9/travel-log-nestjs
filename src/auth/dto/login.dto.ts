import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  /**
   * The password of the user.
   * @example 'password'
   */
  @IsString()
  @IsNotEmpty()
  password: string;

  /**
   * The email of the user.
   * @example 'abc@example.com'
   */
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  username: string;
}
