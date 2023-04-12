import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsersModule } from '@users';

@Module({
  controllers: [AuthController],
  imports: [UsersModule],
  providers: [AuthService],
})
export class AuthModule {}
