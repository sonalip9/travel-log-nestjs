import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateJournalDto } from './dto/createJournal.dto';
import { JournalService } from './journal.service';
import { JournalDocument } from './schema/journal.schema';

@Controller('/journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get()
  getHello(): string {
    return this.journalService.getHello();
  }

  @Post('/create')
  async createJournal(
    @Body() createJournalDto: CreateJournalDto,
  ): Promise<JournalDocument> {
    return this.journalService.createJournal(createJournalDto);
  }
}
