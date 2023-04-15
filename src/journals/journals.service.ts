import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { JournalsDto } from './dto/journals.dto';
import { Journals } from './schema/journals.schema';
import { Pages } from './schema/pages.schema';

import { SecureUsersDocument } from '@users';

@Injectable()
export class JournalsService {
  constructor(
    @InjectModel(Journals.name) private journalsModel: Model<Journals>,
  ) {}

  /**
   * Creates a new journal.
   * @param journalData The data to create a journal.
   * @param journalData.title The title of the journal.
   * @param journalData.description (optional) The description of the journal.
   * @returns The created journal.
   */
  async createJournal(journalData: Journals): Promise<JournalsDto> {
    const journalDocument = await this.journalsModel.create(journalData);
    return journalDocument.toObject();
  }

  /**
   * Fetches all journals from the database.
   * @returns List of all journals.
   */
  async getAllJournals(user: SecureUsersDocument): Promise<JournalsDto[]> {
    const journals = await this.journalsModel.find({ userId: user._id }).exec();
    return journals.map((journal) => journal.toObject());
  }

  /**
   * Fetches a journal with the given id.
   * @param id The id of the journal to fetch.
   * @returns THe journal with the given id.
   */
  async getJournal(
    id: string,
    user: SecureUsersDocument,
  ): Promise<JournalsDto> {
    const journal = await this.journalsModel.findById(id);
    if (journal.userId.toString() !== user._id.toString()) {
      throw new UnauthorizedException();
    }
    return journal.toObject();
  }

  /**
   * Updates a journal with the given id.
   *
   * The method first finds the journal by the journal id. If it
   * doesn't exist, it throws an error. If it does exist but doesn't belong
   * to the user, it throws an error. If it does exist and belongs to the user,
   * it updates the journal with the given data and returns the updated journal.
   * @param id The id of the journal to update.
   * @param updateJournalData The data to update the journal with.
   * @param updateJournalData.title (optional) The title of the journal.
   * @param updateJournalData.description (optional) The description of the journal.
   * @returns The updated journal.
   */
  async updateJournal(
    id: string,
    updateJournalData: Partial<Journals>,
    users: SecureUsersDocument,
  ): Promise<JournalsDto> {
    const journal = await this.journalsModel.findOne({ _id: id });

    if (!journal) {
      throw new NotFoundException();
    }

    if (journal.userId.toString() !== users._id.toString()) {
      throw new UnauthorizedException();
    }

    journal.set(updateJournalData);
    return (await journal.save()).toObject();
  }

  /**
   * Deletes a journal with the given id.
   * @param id The id of the journal to delete.
   * @returns The deleted journal.
   */
  async deleteJournal(
    id: string,
    user: SecureUsersDocument,
  ): Promise<JournalsDto> {
    const journal = await this.journalsModel.findById(id);
    if (journal.userId.toString() !== user._id.toString()) {
      throw new UnauthorizedException();
    }

    return journal.deleteOne();
  }

  /**
   * Creates a new page in a journal.
   * @param id The id of the journal to add a page to.
   * @param page The data to create a page.
   * @param page.title The title of the page.
   * @param page.content (optional) The content of the page.
   * @param page.date The date of the page.
   * @returns The updated journal.
   */
  async addPage(
    id: string,
    page: Pages,
    user: SecureUsersDocument,
  ): Promise<JournalsDto> {
    const journal = await this.journalsModel.findById(id);

    if (journal.userId.toString() !== user._id.toString()) {
      throw new UnauthorizedException();
    }

    journal.pages.push(page);
    await journal.save();

    return journal.toObject();
  }

  /**
   * Updates a page in a journal.
   * @param id The id of the journal to update a page in.
   * @param pageId The id of the page to update.
   * @param page The data to update the page with.
   * @param page.title (optional) The title of the page.
   * @param page.content (optional) The content of the page.
   * @param page.date (optional) The date of the page.
   * @returns The updated journal.
   */
  async updatePage(
    id: string,
    pageId: string,
    page: Partial<Pages>,
    user: SecureUsersDocument,
  ): Promise<JournalsDto> {
    // Create the update query.
    const updateQuery = {};
    Object.keys(page).forEach((key) => {
      updateQuery[`pages.$.${key}`] = page[key];
    });

    const journal = await this.journalsModel.findById(id);

    if (journal.userId.toString() !== user._id.toString()) {
      throw new UnauthorizedException();
    }

    journal.$where = { 'pages._id': pageId };

    return journal.set(updateQuery).toObject();
  }

  /**
   * Deletes a page from a journal.
   * @param id The id of the journal to delete a page from.
   * @param pageId The id of the page to delete.
   * @returns The updated journal.
   */
  async deletePage(
    id: string,
    pageId: string,
    user: SecureUsersDocument,
  ): Promise<JournalsDto> {
    const journal = await this.journalsModel.findById(id);

    if (journal.userId.toString() !== user._id.toString()) {
      throw new UnauthorizedException();
    }

    return journal.set({ $pull: { pages: { _id: pageId } } }).toObject();
  }
}
