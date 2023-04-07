import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { JournalController, JournalService } from '@journal';

@Module({
  controllers: [JournalController],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB),
  ],
  providers: [JournalService],
})
export class AppModule {}
