import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'users', timestamps: true })
export class Users {
  /**
   * The user's email address (unique) - used for login.
   * @type {string}
   * @memberof Users
   * @example 'abc@example.com'
   * @required
   * @index
   * @unique
   */
  @Prop({
    index: true,
    required: true,
    unique: true,
    validators: [
      {
        msg: 'Invalid email address',
        validator: (val: string) =>
          /^\w+([\._]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(val),
      },
    ],
  })
  username: string;

  /**
   * The user's password - used for login.
   * The password is hashed before being stored in the database.
   * @type {string}
   * @memberof Users
   * @example 'abc123'
   * @required
   */
  @Prop({ minlength: 8, required: true })
  password: string;
}

export type UsersDocument = HydratedDocument<Users>;

export type SecureUsersDocument = Omit<UsersDocument, 'password'>;

export const UsersSchema = SchemaFactory.createForClass(Users);

/**
 * Hashes the user's password before saving it to the database.
 */
UsersSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

/**
 * Removes the user's password from the response.
 */
UsersSchema.set('toObject', {
  transform: (_doc, ret) => {
    delete ret.password;
  },
  useProjection: true,
  versionKey: false,
});
