import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

import { PagesDocument, PagesSchema } from './pages.schema';

/**
 * The journal schema.
 * Each journal must have a title.
 * It contains an array of pages.
 */
@Schema({
  collection: 'journals',
  timestamps: true,
})
export class Journals {
  /**
   * The title of the journal.
   * @example 'My first journal'
   */
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

  /**
   * The description of the journal. This is optional.
   * @example 'This is my first journal.'
   */
  @Prop({ required: false, trim: true, type: String })
  description?: string;

  /**
   * The pages of the journal. This is optional.
   * @requires PagesSchema
   */
  @Prop({ default: [], required: false, type: [PagesSchema] })
  pages?: Types.Array<PagesDocument>;

  /**
   * The id of the user that owns the journal.
   * @example '60e9b9e0f2f2c8a0b0e9b9e0'
   */
  @Prop({ immutable: true, ref: 'users', required: true, type: Types.ObjectId })
  @ApiProperty({
    description: 'The id of the user that owns the journal.',
    example: '60e9b9e0f2f2c8a0b0e9b9e0',
    type: String,
  })
  userId: Types.ObjectId;
}

export type JournalsDocument = HydratedDocument<Journals>;

export const JournalsSchema = SchemaFactory.createForClass(Journals);

JournalsSchema.alias('_id', 'journalId');

JournalsSchema.set('toObject', {
  aliases: true,
  transform: (doc, ret) => {
    ret.pages = doc.pages?.map((page) => {
      return page.toObject();
    });
    delete ret._id;
    delete ret.id;
  },
  versionKey: false,
  virtuals: ['journalId'],
});
