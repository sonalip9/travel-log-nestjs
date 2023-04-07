import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { JournalController, JournalService } from '@journal';

@Module({
  controllers: [JournalController],
  imports: [ConfigModule.forRoot()],
  providers: [JournalService],
})
export class AppModule {}
