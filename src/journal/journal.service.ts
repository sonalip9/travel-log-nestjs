import { Injectable } from '@nestjs/common';

@Injectable()
export class JournalService {
  getHello(): string {
    return 'Hello World!';
  }
}
