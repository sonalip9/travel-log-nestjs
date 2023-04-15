import { Journals } from '../schema/journals.schema';

export class JournalsDto extends Journals {
  /**
   * The id of the journal.
   * @example '60e9b9e0f2f2c8a0b0e9b9e0'
   */
  journalId: string;

  /**
   * The date the journal was created.
   * @example '2021-07-10T00:00:00.000Z'
   */
  createdAt: Date;

  /**
   * The date the journal was last updated.
   * @example '2021-07-10T00:00:00.000Z'
   */
  updatedAt: Date;
}
