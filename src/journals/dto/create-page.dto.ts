import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePageDto {
  /**
   * The title of the page.
   * @example 'My first page'
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * The content of the page. This is optional.
   * @example 'This is my first page.'
   */
  @IsString()
  @IsOptional()
  content?: string;

  /**
   * The date of the page.
   * @example '2021-07-15T00:00:00.000Z'
   */
  @IsDateString()
  @IsNotEmpty()
  date: Date;
}
