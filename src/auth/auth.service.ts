import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interface/login-res.interface';

import { SecureUsersDocument, Users, UsersService } from '@users';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async create(userDto: LoginDto): Promise<Users> {
    return await this.usersService.create(userDto);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    return this.usersService.findOne(username, pass);
  }

  async login(user: SecureUsersDocument): Promise<LoginResponse> {
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
