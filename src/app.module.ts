import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { JournalModule } from '@journal';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB),
    JournalModule,
  ],
  providers: [],
})
export class AppModule {}
