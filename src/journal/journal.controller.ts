import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreatePageDto } from './dto/create-page.dto';
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

  /**
   * Creates a new page in a journal.
   * @param id The id of the journal to add a page to.
   * @param createPageDto The data to create a page.
   * @param createPageDto.title The title of the page.
   * @param createPageDto.content (optional) The content of the page.
   * @param createPageDto.date The date of the page.
   * @returns The updated journal.
   */
  @Post('/:id/page/create')
  async createPage(
    @Param('id') id: string,
    @Body() createPageDto: CreatePageDto,
  ): Promise<JournalDocument> {
    return this.journalService.addPage(id, createPageDto);
  }

  @Patch('/:id/page/:pageId/update')
  async updatePage(
    @Param('id') id: string,
    @Param('pageId') pageId: string,
    @Body() createPageDto: Partial<CreatePageDto>,
  ): Promise<JournalDocument> {
    return this.journalService.updatePage(id, pageId, createPageDto);
  }

  @Delete('/:id/page/:pageId/delete')
  async deletePage(
    @Param('id') id: string,
    @Param('pageId') pageId: string,
  ): Promise<JournalDocument> {
    return this.journalService.deletePage(id, pageId);
  }
}
