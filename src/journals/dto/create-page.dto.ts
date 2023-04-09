import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePageDto {
  @ApiProperty({
    description: 'The title of the page.',
    example: 'My first page',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The content of the page.',
    example: 'This is my first page.',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({
    description: 'The date of the page. Format: YYYY-MM-DD',
    example: '2021-01-01',
    required: true,
    type: String,
  })
  @IsDateString()
  @IsNotEmpty()
  date: Date;
}
