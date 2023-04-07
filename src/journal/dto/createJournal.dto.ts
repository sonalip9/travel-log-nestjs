import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJournalDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
