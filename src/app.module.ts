import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '@auth';
import { JournalsModule } from '@journals';
import { UsersModule } from '@users';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB),
    JournalsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
