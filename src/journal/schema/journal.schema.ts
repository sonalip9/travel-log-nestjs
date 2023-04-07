import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type JournalDocument = HydratedDocument<Journal>;

export type Page = {
  content: string;
  date: Date;
  title: string;
};

@Schema({
  collection: 'journals',
  timestamps: true,
})
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
      new mongoose.Schema(
        {
          content: { type: String },
          date: { required: true, type: Date },
          title: { required: true, type: String },
        },
        { timestamps: true },
      ),
    ],
  })
  pages: Page[];
}

export const JournalSchema = SchemaFactory.createForClass(Journal);
