import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { JournalsDto } from './dto/journals.dto';
import { Journals, JournalsDocument } from './schema/journals.schema';
import { Pages, PagesDocument } from './schema/pages.schema';

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
   * @param journalData.userId The id of the user who created the journal.
   * @param journalData.pages (optional) The pages of the journal.
   * @returns The created journal.
   */
  async createJournal(journalData: Journals): Promise<JournalsDto> {
    const journalDocument = await this.journalsModel.create(journalData);
    return journalDocument.toObject();
  }

  /**
   * Fetches all journals from the database.
   * @param user The user who is fetching the journals.
   * @returns List of all journals.
   */
  async getAllJournals(user: SecureUsersDocument): Promise<JournalsDto[]> {
    const journals = await this.journalsModel.find({ userId: user._id }).exec();
    return journals.map((journal) => journal.toObject());
  }

  /**
   * Fetches a journal with the given id.
   * @param id The id of the journal to fetch.
   * @param user The user who is fetching the journal.
   * @returns The journal with the given id.
   * @throws {NotFoundException} When the journal with the given id does not exist.
   * @throws {ForbiddenException} When the user is not the owner of the journal.
   */
  async getJournal(
    id: string,
    user: SecureUsersDocument,
  ): Promise<JournalsDocument> {
    const journal = await this.journalsModel.findById(id);
    if (!journal) {
      throw new NotFoundException('Journal not found');
    }

    if (journal.userId.toString() !== user._id.toString()) {
      throw new ForbiddenException();
    }

    return journal;
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
   * @param updateJournalData.pages (optional) The pages of the journal.
   * @param user The user who is updating the journal.
   * @returns The updated journal.
   * @throws {NotFoundException} When the journal with the given id does not exist.
   * @throws {ForbiddenException} When the user is not the owner of the journal.
   */
  async updateJournal(
    id: string,
    updateJournalData: Partial<Journals>,
    user: SecureUsersDocument,
  ): Promise<JournalsDto> {
    const journal = await this.getJournal(id, user);

    journal.set(updateJournalData);
    return (await journal.save()).toObject();
  }

  /**
   * Deletes a journal with the given id.
   * @param id The id of the journal to delete.
   * @param user The user who is deleting the journal.
   * @returns The deleted journal.
   * @throws {NotFoundException} When the journal with the given id does not exist.
   * @throws {ForbiddenException} When the user is not the owner of the journal.
   */
  async deleteJournal(
    id: string,
    user: SecureUsersDocument,
  ): Promise<JournalsDto> {
    const journal = await this.getJournal(id, user);

    return journal.deleteOne();
  }

  /**
   * Creates a new page in a journal.
   * @param id The id of the journal to add a page to.
   * @param page The data to create a page.
   * @param page.title The title of the page.
   * @param page.content (optional) The content of the page.
   * @param page.date The date of the page.
   * @param user The user who is adding a page to the journal.
   * @returns The updated journal.
   * @throws {NotFoundException} When the journal with the given id does not exist.
   * @throws {ForbiddenException} When the user is not the owner of the journal.
   */
  async addPage(
    id: string,
    page: Pages,
    user: SecureUsersDocument,
  ): Promise<JournalsDto> {
    const journal = await this.getJournal(id, user);

    const photoObject = page.photo && {
      buffer: page.photo.buffer,
      fieldname: page.photo.fieldname,
      mimetype: page.photo.mimetype,
      originalname: page.photo.originalname,
    };

    journal.pages.push({ ...page, photo: photoObject });
    await journal.save();

    return journal.toObject();
  }

  async getPage(
    journal: JournalsDocument,
    pageId: string,
  ): Promise<PagesDocument> {
    const page = journal.pages.find((pg) => pg._id.toString() === pageId);
    if (!page) {
      throw new NotFoundException('Page not found');
    }

    return page;
  }

  /**
   * Updates a page in a journal.
   * @param id The id of the journal to update a page in.
   * @param pageId The id of the page to update.
   * @param page The data to update the page with.
   * @param page.title (optional) The title of the page.
   * @param page.content (optional) The content of the page.
   * @param page.date (optional) The date of the page.
   * @param user The user who is updating a page in the journal.
   * @returns The updated journal.
   * @throws {NotFoundException} When the journal or page with the given id does not exist.
   * @throws {ForbiddenException} When the user is not the owner of the journal.
   */
  async updatePage(
    id: string,
    pageId: string,
    page: Partial<Pages>,
    user: SecureUsersDocument,
  ): Promise<JournalsDto> {
    const photoObject = page.photo && {
      buffer: page.photo.buffer,
      fieldname: page.photo.fieldname,
      mimetype: page.photo.mimetype,
      originalname: page.photo.originalname,
    };

    // Create the update query.
    const updateQuery = {};
    Object.keys(page).forEach((key) => {
      if (key === 'photo') {
        updateQuery[`pages.$.photo`] = photoObject;
        return;
      }
      updateQuery[`pages.$.${key}`] = page[key];
    });

    const journal = await this.getJournal(id, user);

    const pageDocument = await this.getPage(journal, pageId);
    pageDocument.set(page);
    await pageDocument.save();
    await journal.save();

    return journal.toObject();
  }

  /**
   * Deletes a page from a journal.
   * @param id The id of the journal to delete a page from.
   * @param pageId The id of the page to delete.
   * @param user The user who is deleting a page from the journal.
   * @returns The updated journal.
   * @throws {NotFoundException} When the journal or page with the given id does not exist.
   * @throws {ForbiddenException} When the user is not the owner of the journal.
   */
  async deletePage(
    id: string,
    pageId: string,
    user: SecureUsersDocument,
  ): Promise<JournalsDto> {
    const journal = await this.getJournal(id, user);

    const pageDocument = await this.getPage(journal, pageId);
    await pageDocument.deleteOne();
    await journal.save();

    return journal.toObject();
  }
}
