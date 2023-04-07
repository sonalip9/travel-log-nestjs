import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateJournalDto } from './dto/createJournal.dto';
import { Journal } from './schema/journal.schema';

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
}
