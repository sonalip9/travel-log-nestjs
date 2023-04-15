import { IsString } from 'class-validator';

import { Pages } from '../schema/pages.schema';

/**
 * The DTO for the Page model.
 */
export class PagesDto extends Pages {
  /**
   * The id of the page.
   * @example '60e9b9e0f2f2c8a0b0e9b9e0'
   */
  @IsString()
  pageId: string;

  /**
   * The creation date of the page.
   * @example '2021-07-12T14:00:00.000Z'
   */
  createdAt: Date;

  /**
   * The update date of the page.
   * @example '2021-07-12T14:00:00.000Z'
   */
  updatedAt: Date;
}
