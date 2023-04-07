import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';
import { Journal, JournalSchema } from './schema/journal.schema';

@Module({
  controllers: [JournalController],
  imports: [
    MongooseModule.forFeature([{ name: Journal.name, schema: JournalSchema }]),
  ],
  providers: [JournalService],
})
export class JournalModule {}
