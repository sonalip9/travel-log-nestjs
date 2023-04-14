import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'users', timestamps: true })
export class Users {
  @Prop({ index: true, required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export type UsersDocument = HydratedDocument<Users>;

export type SecureUsersDocument = Omit<UsersDocument, 'password'>;

export const UsersSchema = SchemaFactory.createForClass(Users);

UsersSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

UsersSchema.set('toObject', {
  transform: (_doc, ret) => {
    delete ret.password;
  },
  useProjection: true,
  versionKey: false,
});
