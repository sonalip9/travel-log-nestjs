import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

/**
 * The Page schema.
 */
@Schema({ timestamps: true })
export class Page {
  @ApiProperty({
    description: 'The content of the page.',
    example: 'This is my first page.',
    required: false,
    type: String,
  })
  @Prop({ type: String })
  content?: string;

  @ApiProperty({
    description: 'The date of the page. Format: YYYY-MM-DD',
    example: '2021-01-01',
    required: true,
    type: Date,
  })
  @Prop({ required: true, type: Date })
  date: Date;

  @ApiProperty({
    description: 'The title of the page.',
    example: 'My first page',
    required: true,
    type: String,
  })
  @Prop({ required: true, type: String })
  title: string;
}

/**
 * The DTO for the Page model.
 */
export class PageDto extends Page {
  @ApiProperty({
    description: 'The id of the page.',
    example: '60e9b9e0f2f2c8a0b0e9b9e0',
    required: true,
    type: String,
  })
  _id: string;

  @ApiProperty({
    description: 'The creation date of the page.',
    example: '2021-07-12T14:00:00.000Z',
    required: true,
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The last update date of the page.',
    example: '2021-07-12T14:00:00.000Z',
    required: true,
    type: Date,
  })
  updatedAt: Date;
}

export type PageDocument = HydratedDocument<typeof Page>;

export const PageSchema = SchemaFactory.createForClass(Page);
