import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interface/login-res.interface';

import { Public } from '@common/decorator/public.decorator';
import { Refresh } from '@common/decorator/refresh.decorator';
import { ReqUser } from '@common/decorator/req-user.decorator';
import { Error } from '@common/interface/error.interface';
import { SecureUsersDocument, Users } from '@users';

@Controller('auth')
@ApiTags('Authentication')
@ApiBadRequestResponse({
  description: 'When the body parameters fail validation.',
  schema: {
    example: {
      error: 'Bad Request',
      message: ['password should not be empty', 'password must be a string'],
      statusCode: 400,
    },
  },
  type: Error,
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Creates a new user.
   * @param loginDto The user's credentials for creating an account.
   * @returns The user's data with the access token.
   * @throws HttpException if the user already exists.
   * @throws HttpException if the user's data is invalid.
   */
  @Post('/signup')
  @Public()
  @ApiConflictResponse({
    description: 'When the user already exists.',
    schema: {
      example: {
        error: 'Conflict',
        message: 'User already exists',
        statusCode: 409,
      },
    },
    type: Error,
  })
  async createUser(@Body() loginDto: LoginDto): Promise<Users> {
    return await this.authService.create(loginDto);
  }

  /**
   * Logs in a user.
   * @param req The request object containing the user's data.
   * @returns The user's data with the access token.
   * @throws HttpException if the user doesn't exist.
   * @throws HttpException if the user's data is invalid.
   */
  @Post('/login')
  @Public()
  @ApiUnauthorizedResponse({
    description:
      "When the username doesn't exists or  user's password is incorrect.",
    schema: {
      example: {
        error: 'Unauthorized',
        message: 'Invalid credentials',
        statusCode: 401,
      },
    },
  })
  async login(@Body() user: LoginDto): Promise<any> {
    return this.authService.validateUser(user);
  }

  /**
   * Refreshes the access token.
   * @param user The user's data.
   * @returns The user's data with the access token.
   * @throws HttpException if the user doesn't exist.
   * @throws HttpException if the user's data is invalid.
   * @throws HttpException if the refresh token is invalid.
   */
  @Get('/refresh')
  @Refresh()
  async refresh(@ReqUser() user: SecureUsersDocument): Promise<LoginResponse> {
    return this.authService.login(user);
  }
}
