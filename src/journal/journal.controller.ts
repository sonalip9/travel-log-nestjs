import { Controller, Get } from '@nestjs/common';

import { JournalService } from './journal.service';

@Controller()
export class JournalController {
  constructor(private readonly appService: JournalService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
