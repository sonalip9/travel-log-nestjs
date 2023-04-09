import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { JournalsController } from './journals.controller';
import { JournalsService } from './journals.service';
import { Journals } from './schema/journals.schema';

describe('JournalController', () => {
  let journalsController: JournalsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [JournalsController],
      providers: [
        JournalsService,
        { provide: getModelToken(Journals.name), useValue: jest.fn() },
      ],
    }).compile();

    journalsController = app.get<JournalsController>(JournalsController);
  });

  describe('root', () => {
    it('should return "Journals service is up and running!"', () => {
      expect(journalsController.healthCheck()).toBe(
        'Journals service is up and running!',
      );
    });
  });
});
