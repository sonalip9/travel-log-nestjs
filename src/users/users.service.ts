import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bycrypt from 'bcrypt';
import { Model } from 'mongoose';

import { Users } from './schema/users.schema';

import { LoginDto } from '@/auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  /**
   * Checks if the user exists in the db. If not, creates a new user.
   * @param loginDto The user's login data.
   * @param login.username The email address used as user's username.
   * @param login.password The user's password.
   * @returns The user's data
   * @throws HttpException if the user already exists.
   * @throws HttpException if the user's data is invalid.
   */
  async create(loginDto: LoginDto): Promise<Users> {
    // Check if the user exists in the db
    const userInDb = await this.usersModel.findOne({
      username: loginDto.username,
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersModel.create(loginDto);
    return user.toObject();
  }

  async findByUsername(username: string): Promise<Users> {
    return (await this.usersModel.findOne({ username }).exec()).toObject();
  }

  /**
   * Finds a user by its username.
   * @param username The email address used as user's username.
   * @param pass The user's password.
   * @returns The user's data.
   * @throws HttpException if the user doesn't exist.
   * @throws HttpException if the user's data is invalid.
   * @throws HttpException if the user's password is invalid.
   */
  async findOne(username: string, pass: string): Promise<Users> {
    const user = await this.usersModel.findOne({ username });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const comparePassword = await bycrypt.compare(pass, user.password);
    if (!comparePassword) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    return user.toObject();
  }
}
