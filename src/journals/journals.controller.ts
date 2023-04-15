import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { CreateJournalDto } from './dto/create-journal.dto';
import { CreatePageDto } from './dto/create-page.dto';
import { JournalsDto } from './dto/journals.dto';
import { UserJournalsDto } from './dto/user-journals.dto';
import { JournalsService } from './journals.service';

import { ForbiddenResponse } from '@common/decorator/error/forbidden.decorator';
import { InternalServerErrorResponse } from '@common/decorator/error/internal-server.decorator';
import { NotFoundResponse } from '@common/decorator/error/not-found.decorator';
import { UnauthorizedResponse } from '@common/decorator/error/unauthorized.decorator';
import { Public } from '@common/decorator/public.decorator';
import { AuthenticatedReq } from '@common/interface/auth-req.interface';

@Controller('/journals')
@ApiTags('Journal')
@ApiBearerAuth()
@UnauthorizedResponse()
@InternalServerErrorResponse()
export class JournalsController {
  constructor(private readonly journalService: JournalsService) {}

  @Get('/healthCheck')
  @ApiExcludeEndpoint()
  @Public()
  healthCheck(): string {
    return 'Journals service is up and running!';
  }

  /**
   * Creates a new journal.
   * @param createJournalDto The data to create a journal.
   * @returns The created journal.
   * @throws {BadRequestException} When the body params are invalid.
   * @throws {UnauthorizedException} When the user is not authenticated.
   * @throws {InternalServerErrorException} When the journal could not be created.
   */
  @Post()
  @ApiCreatedResponse({
    description: 'The created journal.',
    type: JournalsDto,
  })
  @ApiBadRequestResponse({
    description: 'When the body params are invalid.',
    schema: {
      example: {
        error: 'Bad Request',
        message: ['title should not be empty'],
        statusCode: 400,
      },
    },
  })
  async createJournal(
    @Req() req: AuthenticatedReq,
    @Body() createJournalDto: CreateJournalDto,
  ): Promise<JournalsDto> {
    return this.journalService.createJournal({
      ...createJournalDto,
      userId: req.user._id,
    });
  }

  /**
   * Fetches all journals from the database.
   * @returns List of all journals.
   * @throws {UnauthorizedException} When the user is not authenticated.
   * @throws {InternalServerErrorException} When the journals could not be fetched.
   */
  @Get('/all')
  @ApiOkResponse({
    description: 'List of all journals.',
    type: UserJournalsDto,
  })
  async getAllJournals(@Req() req: AuthenticatedReq): Promise<UserJournalsDto> {
    const journals = await this.journalService.getAllJournals(req.user);
    return { userJournals: journals };
  }

  /**
   * Fetches a journal with the given id.
   * @param id The id of the journal to fetch.
   * @returns The journal with the given id.
   * @throws {UnauthorizedException} When the user is not authenticated.
   * @throws {NotFoundException} When the journal with the given id does not exist.
   * @throws {ForbiddenException} When the user is not the owner of the journal.
   * @throws {InternalServerErrorException} When the journal could not be fetched.
   */
  @Get('/:id')
  @ApiParam({ description: 'The id of the journal to fetch.', name: 'id' })
  @ApiOkResponse({
    description: 'The journal with the given id.',
    type: JournalsDto,
  })
  @NotFoundResponse({
    description: 'When the journal with the given id does not exist.',
    message: 'Journal not found',
  })
  @ForbiddenResponse('When the user is not the owner of the journal.')
  async getJournal(
    @Param('id') id: string,
    @Req() req: AuthenticatedReq,
  ): Promise<JournalsDto> {
    const journal = await this.journalService.getJournal(id, req.user);
    return journal.toObject();
  }

  /**
   * Updates a journal with the given id.
   * @param id The id of the journal to update.
   * @param createJournalDto The data to update the journal with.
   * @param createJournalDto.title (optional) The title of the journal.
   * @param createJournalDto.description (optional) The description of the journal.
   * @returns The updated journal.
   * @throws {BadRequestException} When the body params are invalid.
   * @throws {UnauthorizedException} When the user is not authenticated.
   * @throws {NotFoundException} When the journal with the given id does not exist.
   * @throws {ForbiddenException} When the user is not the owner of the journal.
   * @throws {InternalServerErrorException} When the journal could not be updated.
   */
  @Patch('/:id')
  @ApiParam({ description: 'The id of the journal to update.', name: 'id' })
  @ApiOkResponse({
    description: 'The updated journal.',
    type: JournalsDto,
  })
  @ApiBadRequestResponse({
    description: 'When the body params are invalid.',
    schema: {
      example: {
        error: 'Bad Request',
        message: ['title should not be empty'],
        statusCode: 400,
      },
    },
  })
  @NotFoundResponse({
    description: 'When the journal with the given id does not exist.',
    message: 'Journal not found',
  })
  @ForbiddenResponse('When the user is not the owner of the journal.')
  async updateJournal(
    @Param('id') id: string,
    @Body() createJournalDto: Partial<CreateJournalDto>,
    @Req() req: AuthenticatedReq,
  ): Promise<JournalsDto> {
    return this.journalService.updateJournal(id, createJournalDto, req.user);
  }

  /**
   * Deletes a journal with the given id.
   * @param id The id of the journal to delete.
   * @returns The deleted journal.
   * @throws {UnauthorizedException} When the user is not authenticated.
   * @throws {NotFoundException} When the journal with the given id does not exist.
   * @throws {ForbiddenException} When the user is not the owner of the journal.
   * @throws {InternalServerErrorException} When the journal could not be deleted.
   */
  @ApiParam({ description: 'The id of the journal to delete.', name: 'id' })
  @ApiOkResponse({ description: 'The deleted journal.', type: JournalsDto })
  @NotFoundResponse({
    description: 'When the journal with the given id does not exist.',
    message: 'Journal not found',
  })
  @ForbiddenResponse('When the user is not the owner of the journal.')
  @Delete('/:id')
  async deleteJournal(
    @Param('id') id: string,
    @Req() req: AuthenticatedReq,
  ): Promise<JournalsDto> {
    return this.journalService.deleteJournal(id, req.user);
  }

  /**
   * Creates a new page in a journal.
   * @param id The id of the journal to add a page to.
   * @param createPageDto The data to create a page.
   * @param createPageDto.title The title of the page.
   * @param createPageDto.content (optional) The content of the page.
   * @param createPageDto.date The date of the page.
   * @returns The updated journal.
   * @throws {BadRequestException} When the body params are invalid.
   * @throws {UnauthorizedException} When the user is not authenticated.
   * @throws {NotFoundException} When the journal with the given id does not exist.
   * @throws {ForbiddenException} When the user is not the owner of the journal.
   * @throws {InternalServerErrorException} When the page could not be created.
   */
  @Post('/:id/pages')
  @ApiParam({
    description: 'The id of the journal to add a page to.',
    name: 'id',
  })
  @ApiCreatedResponse({
    description: 'The updated journal.',
    type: JournalsDto,
  })
  @ApiBadRequestResponse({
    description: 'When the body params are invalid.',
    schema: {
      example: {
        error: 'Bad Request',
        message: ['title should not be empty'],
        statusCode: 400,
      },
    },
  })
  @NotFoundResponse({
    description: 'When the journal with the given id does not exist.',
    message: 'Journal not found',
  })
  @ForbiddenResponse('When the user is not the owner of the journal.')
  async createPage(
    @Param('id') id: string,
    @Body() createPageDto: CreatePageDto,
    @Req() req: AuthenticatedReq,
  ): Promise<JournalsDto> {
    return this.journalService.addPage(id, createPageDto, req.user);
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
   * @throws {BadRequestException} When the body params are invalid.
   * @throws {UnauthorizedException} When the user is not authenticated.
   * @throws {NotFoundException} When the journal or page with the given id does not exist.
   * @throws {ForbiddenException} When the user is not the owner of the journal.
   * @throws {InternalServerErrorException} When the page could not be updated.
   */
  @Patch('/:id/pages/:pageId')
  @ApiParam({
    description: 'The id of the journal to update a page in.',
    name: 'id',
  })
  @ApiParam({
    description: 'The id of the page to update.',
    name: 'pageId',
  })
  @ApiOkResponse({
    description: 'The updated journal.',
    type: JournalsDto,
  })
  @ApiBadRequestResponse({
    description: 'When the body params are invalid.',
    schema: {
      example: {
        error: 'Bad Request',
        message: ['title should not be empty'],
        statusCode: 400,
      },
    },
  })
  @NotFoundResponse({
    description: 'When the journal or page with the given id does not exist.',
    message: 'Page not found',
  })
  @ForbiddenResponse('When the user is not the owner of the journal.')
  async updatePage(
    @Param('id') id: string,
    @Param('pageId') pageId: string,
    @Body() createPageDto: Partial<CreatePageDto>,
    @Req() req: AuthenticatedReq,
  ): Promise<JournalsDto> {
    return this.journalService.updatePage(id, pageId, createPageDto, req.user);
  }

  /**
   * Deletes a page from a journal.
   * @param id The id of the journal to delete a page from.
   * @param pageId The id of the page to delete.
   * @returns The updated journal with the deleted page.
   * @throws {UnauthorizedException} When the user is not authenticated.
   * @throws {NotFoundException} When the journal with the given id does not exist.
   * @throws {ForbiddenException} When the user is not the owner of the journal.
   * @throws {NotFoundException} When the page could not be found.
   * @throws {InternalServerErrorException} When the page could not be deleted.
   */
  @Delete('/:id/pages/:pageId')
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
  @NotFoundResponse({
    description: 'When the journal or page with the given id does not exist.',
    message: 'Page not found',
  })
  @ForbiddenResponse('When the user is not the owner of the journal.')
  async deletePage(
    @Param('id') id: string,
    @Param('pageId') pageId: string,
    @Req() req: AuthenticatedReq,
  ): Promise<JournalsDto> {
    return this.journalService.deletePage(id, pageId, req.user);
  }
}
