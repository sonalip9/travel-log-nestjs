import { JournalsDto } from './journals.dto';

export class UserJournalsDto {
  /**
   * The list of journals that the user has.
   * @requires JournalsDocument
   */
  userJournals: JournalsDto[];
}
