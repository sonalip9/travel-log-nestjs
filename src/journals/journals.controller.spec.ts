import { Test, TestingModule } from '@nestjs/testing';

import { JournalsController } from './journals.controller';
import { JournalsService } from './journals.service';

describe('JournalController', () => {
  let appController: JournalsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [JournalsController],
      providers: [JournalsService],
    }).compile();

    appController = app.get<JournalsController>(JournalsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
