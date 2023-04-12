import { Injectable } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';

import { Users, UsersService } from '@users';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async create(userDto: LoginDto): Promise<Users> {
    return await this.usersService.create(userDto);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    return this.usersService.findOne(username, pass);
  }
}
