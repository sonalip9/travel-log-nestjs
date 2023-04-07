import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateJournalDto } from './dto/createJournal.dto';
import { JournalService } from './journal.service';
import { JournalDocument } from './schema/journal.schema';

@Controller('/journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  /**
   * Creates a new journal.
   * @param createJournalDto The data to create a journal.
   * @param createJournalDto.title The title of the journal.
   * @param createJournalDto.description (optional) The description of the journal.
   * @returns The created journal.
   */
  @Post('/create')
  async createJournal(
    @Body() createJournalDto: CreateJournalDto,
  ): Promise<JournalDocument> {
    return this.journalService.createJournal(createJournalDto);
  }

  /**
   * Fetches all journals from the database.
   * @returns List of all journals.
   */
  @Get('/all')
  async getAllJournals(): Promise<JournalDocument[]> {
    return this.journalService.getAllJournals();
  }

  /**
   * Fetches a journal with the given id.
   * @param id The id of the journal to fetch.
   * @returns The journal with the given id.
   */
  @Get('/:id')
  async getJournal(@Param('id') id: string): Promise<JournalDocument> {
    return this.journalService.getJournal(id);
  }

  /**
   * Updates a journal with the given id.
   * @param id The id of the journal to update.
   * @param createJournalDto The data to update the journal with.
   * @param createJournalDto.title (optional) The title of the journal.
   * @param createJournalDto.description (optional) The description of the journal.
   * @returns
   */
  @Patch('/:id/update')
  async updateJournal(
    @Param('id') id: string,
    @Body() createJournalDto: Partial<CreateJournalDto>,
  ): Promise<JournalDocument> {
    return this.journalService.updateJournal(id, createJournalDto);
  }

  /**
   * Deletes a journal with the given id.
   * @param id The id of the journal to delete.
   * @returns The deleted journal.
   */
  @Delete('/:id/delete')
  async deleteJournal(@Param('id') id: string): Promise<JournalDocument> {
    return this.journalService.deleteJournal(id);
  }
}
