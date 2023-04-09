import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJournalDto {
  @ApiProperty({
    description: 'The title of the journal.',
    example: 'My first journal',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the journal.',
    example: 'This is my first journal.',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
