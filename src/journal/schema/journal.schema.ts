import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JournalDocument = HydratedDocument<Journal>;

export type Page = {
  title: string;
  content: string;
  date: Date;
  pageNumber: number;
};

@Schema()
export class Journal {
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

  @Prop({
    trim: true,
    type: String,
  })
  description: string;

  @Prop({
    type: [
      {
        content: { type: String },
        date: { required: true, type: Date },
        pageNumber: { required: true, type: Number },
        title: { required: true, type: String },
      },
    ],
  })
  pages: Page[];
}

export const JournalSchema = SchemaFactory.createForClass(Journal);
