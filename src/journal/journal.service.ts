import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateJournalDto } from './dto/createJournal.dto';
import { Journal, Page } from './schema/journal.schema';

@Injectable()
export class JournalService {
  constructor(
    @InjectModel(Journal.name) private journalModel: Model<Journal>,
  ) {}

  /**
   * Creates a new journal.
   * @param createJournalDto The data to create a journal.
   * @param createJournalDto.title The title of the journal.
   * @param createJournalDto.description (optional) The description of the journal.
   * @returns The created journal.
   */
  async createJournal(createJournalDto: CreateJournalDto) {
    return this.journalModel.create(createJournalDto);
  }

  /**
   * Fetches all journals from the database.
   * @returns List of all journals.
   */
  async getAllJournals() {
    return this.journalModel.find().exec();
  }

  /**
   * Fetches a journal with the given id.
   * @param id The id of the journal to fetch.
   * @returns THe journal with the given id.
   */
  async getJournal(id: string) {
    return this.journalModel.findById(id);
  }

  /**
   * Updates a journal with the given id.
   * @param id The id of the journal to update.
   * @param createJournalDto The data to update the journal with.
   * @param createJournalDto.title (optional) The title of the journal.
   * @param createJournalDto.description (optional) The description of the journal.
   * @returns The updated journal.
   */
  async updateJournal(id: string, createJournalDto: Partial<CreateJournalDto>) {
    return this.journalModel.findByIdAndUpdate(id, createJournalDto, {
      new: true,
    });
  }

  /**
   * Deletes a journal with the given id.
   * @param id The id of the journal to delete.
   * @returns The deleted journal.
   */
  async deleteJournal(id: string) {
    return this.journalModel.findByIdAndDelete(id);
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
  async addPage(id: string, page: Page) {
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
  async updatePage(id: string, pageId: string, page: Partial<Page>) {
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
  async deletePage(id: string, pageId: string) {
    return this.journalModel
      .findByIdAndUpdate(id, { $pull: { pages: { _id: pageId } } })
      .exec();
  }
}
