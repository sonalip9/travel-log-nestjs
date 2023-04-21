import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { IS_PUBLIC_KEY } from '@common/decorator/public.decorator';
import { IS_REFRESH_KEY } from '@common/decorator/refresh.decorator';
import { UsersService } from '@users';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  /**
   * A method that determines whether the request is authorized.
   *
   * It is called by the Nest runtime before the route handler is invoked.
   * First, it checks if the route is public. If it is, it returns true.
   * Otherwise, it extracts the token from the request header and verifies it.
   * If the token is valid, it adds the user to the request object and returns true.
   * Otherwise, it throws an UnauthorizedException.
   * @param context The context of the request.
   * @returns A boolean indicating whether the request is authorized.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const isRefresh = this.reflector.getAllAndOverride<boolean>(
      IS_REFRESH_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        ignoreExpiration: isRefresh,
        secret: process.env.JWT_SECRET,
      });

      request['user'] = await this.usersService.findByUsername(
        payload.username,
      );
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
