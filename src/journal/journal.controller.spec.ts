import { Test, TestingModule } from '@nestjs/testing';

import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';

describe('JournalController', () => {
  let appController: JournalController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [JournalController],
      providers: [JournalService],
    }).compile();

    appController = app.get<JournalController>(JournalController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
