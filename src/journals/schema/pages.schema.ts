import { Readable } from 'stream';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
class PhotoFile implements Express.Multer.File {
  @Prop({ type: String })
  fieldname: string;

  @Prop({ type: String })
  originalname: string;

  @Prop({ type: String })
  encoding: string;

  @Prop({ type: String })
  mimetype: string;

  @Prop({ type: Number })
  size: number;

  @Prop({ type: Readable })
  stream: Readable;

  @Prop({ type: String })
  destination: string;

  @Prop({ type: String })
  filename: string;

  @Prop({ type: String })
  path: string;

  @Prop({ type: Buffer })
  buffer: Buffer;
}

/**
 * The Page schema.
 */
@Schema({ timestamps: true })
export class Pages {
  /**
   * The content of the page. This is optional.
   * @example 'This is my first page.'
   */
  @Prop({ type: String })
  content?: string;

  /**
   * The date of the page.
   * @example '2021-07-15T00:00:00.000Z'
   */
  @Prop({ required: true, type: Date })
  date: Date;

  /**
   * The title of the page.
   */
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ type: PhotoFile })
  photo?: PhotoFile;
}

export type PagesDocument = HydratedDocument<typeof Pages>;

export const PagesSchema = SchemaFactory.createForClass(Pages);

PagesSchema.alias('_id', 'pageId');

PagesSchema.set('toObject', {
  aliases: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.id;
  },
  versionKey: false,
  virtuals: ['pageId'],
});
