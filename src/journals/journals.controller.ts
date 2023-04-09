import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  PartialType,
} from '@nestjs/swagger';

import { CreateJournalDto } from './dto/create-journal.dto';
import { CreatePageDto } from './dto/create-page.dto';
import { JournalsService } from './journals.service';
import { JournalsDocument, JournalsDto } from './schema/journals.schema';

@Controller('/journals')
@ApiTags('Journal')
export class JournalsController {
  constructor(private readonly journalService: JournalsService) {}

  @Get('/healthCheck')
  @ApiExcludeEndpoint()
  healthCheck(): string {
    return 'Journals service is up and running!';
  }

  /**
   * Creates a new journal.
   * @param createJournalDto The data to create a journal.
   * @param createJournalDto.title The title of the journal.
   * @param createJournalDto.description (optional) The description of the journal.
   * @returns The created journal.
   */
  @Post()
  @ApiOperation({ summary: 'Creates a new journal.' })
  @ApiBody({
    description: 'The data to create a journal.',
    type: CreateJournalDto,
  })
  @ApiCreatedResponse({
    description: 'The created journal.',
    type: JournalsDto,
  })
  async createJournal(
    @Body() createJournalDto: CreateJournalDto,
  ): Promise<JournalsDocument> {
    return this.journalService.createJournal(createJournalDto);
  }

  /**
   * Fetches all journals from the database.
   * @returns List of all journals.
   */
  @Get('/all')
  @ApiOperation({ summary: 'Fetches all journals from the database.' })
  @ApiOkResponse({ description: 'List of all journals.', type: [JournalsDto] })
  async getAllJournals(): Promise<JournalsDocument[]> {
    return this.journalService.getAllJournals();
  }

  /**
   * Fetches a journal with the given id.
   * @param id The id of the journal to fetch.
   * @returns The journal with the given id.
   */
  @Get('/:id')
  @ApiOperation({ summary: 'Fetches a journal with the given id.' })
  @ApiParam({ description: 'The id of the journal to fetch.', name: 'id' })
  @ApiOkResponse({
    description: 'The journal with the given id.',
    type: JournalsDto,
  })
  async getJournal(@Param('id') id: string): Promise<JournalsDocument> {
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
  @Patch('/:id')
  @ApiOperation({ summary: 'Updates a journal with the given id.' })
  @ApiParam({ description: 'The id of the journal to update.', name: 'id' })
  @ApiBody({
    description: 'The data to update the journal with.',
    type: PartialType<CreateJournalDto>,
  })
  @ApiOkResponse({
    description: 'The updated journal.',
    type: JournalsDto,
  })
  async updateJournal(
    @Param('id') id: string,
    @Body() createJournalDto: Partial<CreateJournalDto>,
  ): Promise<JournalsDocument> {
    return this.journalService.updateJournal(id, createJournalDto);
  }

  /**
   * Deletes a journal with the given id.
   * @param id The id of the journal to delete.
   * @returns The deleted journal.
   */
  @ApiOperation({ summary: 'Deletes a journal with the given id.' })
  @ApiParam({ description: 'The id of the journal to delete.', name: 'id' })
  @ApiOkResponse({
    description: 'The deleted journal.',
    type: JournalsDto,
  })
  @Delete('/:id')
  async deleteJournal(@Param('id') id: string): Promise<JournalsDocument> {
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
  @Post('/:id/pages')
  @ApiOperation({ summary: 'Creates a new page in a journal.' })
  @ApiParam({
    description: 'The id of the journal to add a page to.',
    name: 'id',
  })
  @ApiBody({
    description: 'The data to create a page.',
    type: CreatePageDto,
  })
  @ApiCreatedResponse({
    description: 'The updated journal.',
    type: JournalsDto,
  })
  async createPage(
    @Param('id') id: string,
    @Body() createPageDto: CreatePageDto,
  ): Promise<JournalsDocument> {
    return this.journalService.addPage(id, createPageDto);
  }

  /**
   * Updates a page in a journal.
   * @param id The id of the journal to update a page in.
   * @param pageId The id of the page to update.
   * @param createPageDto The data to update the page with.
   * @param createPageDto.title (optional) The title of the page.
   * @param createPageDto.content (optional) The content of the page.
   * @param createPageDto.date (optional) The date of the page.
   * @returns The updated journal.
   */
  @Patch('/:id/pages/:pageId')
  @ApiOperation({ summary: 'Updates a page in a journal.' })
  @ApiParam({
    description: 'The id of the journal to update a page in.',
    name: 'id',
  })
  @ApiParam({
    description: 'The id of the page to update.',
    name: 'pageId',
  })
  @ApiBody({
    description: 'The data to update the page with.',
    type: PartialType(CreatePageDto),
  })
  @ApiOkResponse({
    description: 'The updated journal.',
    type: JournalsDto,
  })
  async updatePage(
    @Param('id') id: string,
    @Param('pageId') pageId: string,
    @Body() createPageDto: Partial<CreatePageDto>,
  ): Promise<JournalsDocument> {
    return this.journalService.updatePage(id, pageId, createPageDto);
  }

  /**
   * Deletes a page from a journal.
   * @param id The id of the journal to delete a page from.
   * @param pageId The id of the page to delete.
   * @returns The updated journal with the deleted page.
   */
  @Delete('/:id/pages/:pageId')
  @ApiOperation({ summary: 'Deletes a page from a journal.' })
  @ApiParam({
    description: 'The id of the journal to delete a page from.',
    name: 'id',
  })
  @ApiParam({
    description: 'The id of the page to delete.',
    name: 'pageId',
  })
  @ApiOkResponse({
    description: 'The updated journal with the deleted page.',
    type: JournalsDto,
  })
  async deletePage(
    @Param('id') id: string,
    @Param('pageId') pageId: string,
  ): Promise<JournalsDocument> {
    return this.journalService.deletePage(id, pageId);
  }
}
