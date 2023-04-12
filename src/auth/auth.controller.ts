import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

import { Users } from '@users';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Creates a new user.
   * @param password The user's password.
   * @param username The email address used as user's username.
   * @returns The user's data.
   * @throws HttpException if the user already exists.
   * @throws HttpException if the user's data is invalid.
   */
  @Post('/signup')
  @ApiOperation({ summary: 'Creates a new user.' })
  @ApiBody({
    description: "The user's data.",
    type: LoginDto,
  })
  async createUser(@Body() loginDto: LoginDto): Promise<Users> {
    return await this.authService.create(loginDto);
  }
}
