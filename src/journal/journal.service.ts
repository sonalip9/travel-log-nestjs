import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Journal, JournalDocument } from './schema/journal.schema';
import { Page } from './schema/page.schema';

@Injectable()
export class JournalService {
  constructor(
    @InjectModel(Journal.name) private journalModel: Model<Journal>,
  ) {}

  /**
   * Creates a new journal.
   * @param journalData The data to create a journal.
   * @param journalData.title The title of the journal.
   * @param journalData.description (optional) The description of the journal.
   * @returns The created journal.
   */
  async createJournal(journalData: Journal): Promise<JournalDocument> {
    return this.journalModel.create(journalData);
  }

  /**
   * Fetches all journals from the database.
   * @returns List of all journals.
   */
  async getAllJournals(): Promise<JournalDocument[]> {
    return this.journalModel.find().exec();
  }

  /**
   * Fetches a journal with the given id.
   * @param id The id of the journal to fetch.
   * @returns THe journal with the given id.
   */
  async getJournal(id: string): Promise<JournalDocument> {
    return this.journalModel.findById(id);
  }

  /**
   * Updates a journal with the given id.
   * @param id The id of the journal to update.
   * @param updateJournalData The data to update the journal with.
   * @param updateJournalData.title (optional) The title of the journal.
   * @param updateJournalData.description (optional) The description of the journal.
   * @returns The updated journal.
   */
  async updateJournal(
    id: string,
    updateJournalData: Partial<Journal>,
  ): Promise<JournalDocument> {
    return this.journalModel.findByIdAndUpdate(id, updateJournalData, {
      new: true,
    });
  }

  /**
   * Deletes a journal with the given id.
   * @param id The id of the journal to delete.
   * @returns The deleted journal.
   */
  async deleteJournal(id: string): Promise<JournalDocument> {
    return this.journalModel.findByIdAndDelete(id);
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
  async addPage(id: string, page: Page): Promise<JournalDocument> {
    return this.journalModel
      .findByIdAndUpdate(id, { $push: { pages: page } }, { new: true })
      .exec();
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
    page: Partial<Page>,
  ): Promise<JournalDocument> {
    return this.journalModel
      .findByIdAndUpdate(
        { _id: id, 'pages._id': pageId },
        { $set: { 'pages.$': page } },
        { new: true },
      )
      .exec();
  }

  /**
   * Deletes a page from a journal.
   * @param id The id of the journal to delete a page from.
   * @param pageId The id of the page to delete.
   * @returns The updated journal.
   */
  async deletePage(id: string, pageId: string): Promise<JournalDocument> {
    return this.journalModel
      .findByIdAndUpdate(id, { $pull: { pages: { _id: pageId } } })
      .exec();
  }
}
