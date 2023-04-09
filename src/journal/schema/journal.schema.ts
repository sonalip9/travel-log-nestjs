import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

import { Page, PageDto, PageSchema } from './page.schema';

/**
 * The journal schema.
 */
@Schema({
  collection: 'journals',
  timestamps: true,
})
export class Journal {
  @ApiProperty({
    description: 'The title of the journal.',
    example: 'My first journal',
    required: true,
    type: String,
  })
  @Prop({
    required: true,
    trim: true,
    type: String,
    validate: {
      message: 'Title must be at least 1 character long',
      validator: (value: string) => value.length > 0,
    },
  })
  title: string;

  @ApiProperty({
    description: 'The description of the journal.',
    example: 'This is my first journal.',
    required: false,
    type: String,
  })
  @Prop({ required: false, trim: true, type: String })
  description?: string;

  @ApiProperty({
    description: 'The pages of the journal.',
    example: [
      {
        _id: '60e9b9e0f2f2c8a0b0e9b9e0',
        content: 'This is my first page.',
        createdAt: '2021-07-12T14:00:00.000Z',
        date: '2021-01-01',
        title: 'My first page',
        updatedAt: '2021-07-12T14:00:00.000Z',
      },
    ],
    isArray: true,
    required: false,
    type: [PageDto],
  })
  @Prop({ default: [], required: false, type: [PageSchema] })
  pages?: Page[];
}

/**
 * The DTO for the Journal model.
 */
export class JournalDto extends Journal {
  @ApiProperty({
    description: 'The id of the journal.',
    example: '60e9b9e0f2f2c8a0b0e9b9e0',
    required: true,
    type: String,
  })
  _id: Types.ObjectId;

  @ApiProperty({
    description: 'The date the journal was created.',
    example: '2021-07-14T12:00:00.000Z',
    required: true,
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date the journal was last updated.',
    example: '2021-07-14T12:00:00.000Z',
    required: true,
    type: Date,
  })
  updatedAt: Date;
}

export type JournalDocument = HydratedDocument<Journal>;

export const JournalSchema = SchemaFactory.createForClass(Journal);
