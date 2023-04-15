import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJournalDto {
  /**
   * The title of the journal.
   * @example 'My first journal'
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * The description of the journal. This is optional.
   * @example 'This is my first journal.'
   */
  @IsString()
  @IsOptional()
  description?: string;
}
