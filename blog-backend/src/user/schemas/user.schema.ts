import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema ({
  email: String,
  phone_number: String,
  user_metadata: Array,
  blocked: Boolean,
  email_verified: Boolean,
  phone_verified: Boolean,
  app_metadata: Array,
  given_name: String,
  family_name: String,
  name: String,
  nickname: String,
  picture: String,
  user_id: String,
  connection: String,
  password: String,
  verify_email: Boolean,
  username: String,
  blog: Array,
  profile_picture: String,
});