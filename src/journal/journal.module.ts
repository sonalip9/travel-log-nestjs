import { Module } from '@nestjs/common';

import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';

@Module({
  controllers: [JournalController],
  imports: [],
  providers: [JournalService],
})
export class JournalModule {}
