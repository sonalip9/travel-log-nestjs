import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto';

import { SecureUsersDocument, Users, UsersService } from '@users';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Creates a new user. Then, it logs in the user.
   * @param userDto The user's credentials for creating an account.
   * @returns The user's data with the access token.
   * @throws HttpException if the user already exists.
   * @throws HttpException if the user's data is invalid.
   */
  async create(userDto: LoginDto): Promise<Users> {
    const user = await this.usersService.create(userDto);
    return this.login(user);
  }

  /**
   * Validates a user. Then, it logs in the user.
   * @param loginDto The user's credentials for logging in.
   * @returns The user's data with the access token.
   * @throws HttpException if the user doesn't exist.
   * @throws HttpException if the user's data is invalid.
   * @throws HttpException if the user's password is incorrect.
   */
  async validateUser({ username, password: pass }: LoginDto): Promise<any> {
    const user = await this.usersService.findOne(username, pass);
    return this.login(user);
  }

  /**
   * Logs in a user.
   * @param user The user's data.
   * @returns The user's data with the access token.
   */
  async login(user: SecureUsersDocument): Promise<any> {
    const payload = { userId: user._id, username: user.username };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: Number(process.env.JWT_EXPIRES_IN),
        secret: process.env.JWT_SECRET,
      }),
      expiresIn: Number(process.env.JWT_EXPIRES_IN),
      user: {
        id: user._id.toString(),
        username: user.username,
      },
    };
  }
}
