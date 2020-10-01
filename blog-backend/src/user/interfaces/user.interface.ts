import { Document } from 'mongoose';

export interface User extends Document {
  readonly email: string;
  readonly phone_number: string;
  readonly user_metadata: [];
  readonly blocked: boolean;
  readonly email_verified: boolean;
  readonly phone_verified: boolean;
  readonly app_metadata: [];
  readonly given_name: string;
  readonly family_name: string;
  readonly name: string;
  readonly nickname: string;
  readonly picture: string;
  readonly user_id: string;
  readonly connection: string;
  readonly password: string;
  readonly verify_email: boolean;
  readonly username: string;
  readonly blog: [];
}