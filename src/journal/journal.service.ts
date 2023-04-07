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

  getHello(): string {
    return 'Hello World!';
  }

  async createJournal(createJournalDto: CreateJournalDto) {
    return this.journalModel.create(createJournalDto);
  }
}
