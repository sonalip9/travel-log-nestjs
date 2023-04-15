import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guard/local.guard';

import { Public } from '@common/decorator/public.decorator';
import { AuthenticatedReq } from '@common/interface/auth-req.interface';
import { Users } from '@users';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Creates a new user.
   * @param loginDto The user's credentials for creating an account.
   * @returns The user's data.
   * @throws HttpException if the user already exists.
   * @throws HttpException if the user's data is invalid.
   */
  @Post('/signup')
  @Public()
  async createUser(@Body() loginDto: LoginDto): Promise<Users> {
    return await this.authService.create(loginDto);
  }

  /**
   * Logs in a user.
   * @param req The request object containing the user's data.
   * @returns The user's data.
   * @throws HttpException if the user doesn't exist.
   * @throws HttpException if the user's data is invalid.
   */
  @Post('/login')
  @ApiBody({ description: "The user's data.", type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Public()
  async login(@Request() req: AuthenticatedReq): Promise<any> {
    return this.authService.login(req.user);
  }
}
