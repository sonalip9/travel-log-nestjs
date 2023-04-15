import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bycrypt from 'bcrypt';
import { Error, Model } from 'mongoose';

import { SecureUsersDocument, Users } from './schema/users.schema';

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
  async create(loginDto: LoginDto): Promise<SecureUsersDocument> {
    // Check if the user exists in the db
    const userInDb = await this.usersModel.findOne({
      username: loginDto.username,
    });
    if (userInDb) {
      throw new ConflictException('User already exists');
    }

    try {
      const user = await this.usersModel.create(loginDto);
      return user.toObject();
    } catch (err) {
      if (err instanceof Error.ValidationError) {
        throw new BadRequestException(err.message);
      } else {
        throw new InternalServerErrorException('Something went wrong', {
          cause: err,
        });
      }
    }
  }

  /**
   * Finds a user by its username.
   * @param username The email address used as user's username.
   * @returns The user's data.
   * @throws HttpException if the user doesn't exist.
   */
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
  async findOne(username: string, pass: string): Promise<SecureUsersDocument> {
    const user = await this.usersModel.findOne({ username });
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const comparePassword = await bycrypt.compare(pass, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user.toObject();
  }
}
