import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly given_name: string;
  readonly family_name: string;
  readonly phone_number: string;
  readonly email: string;
  readonly password: string;
  readonly blog: [];
}