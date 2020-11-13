import * as mongoose from 'mongoose';
import {compare, hash} from "bcrypt";
import {User} from "../interfaces/user.interface";

export const UserSchema = new mongoose.Schema ({
  username: {type: String, required: true, unique: true},
  given_name: {type: String, required: true},
  family_name: {type: String, required: true},
  phone_number: {type: String, required: false},
  email: {type: String, required: true, unique: true},
  password: {type: String, select: false},
  blog: Array,
  profile_picture: {type: String, required: false},
});

export async function preSaveHook(next) {
  if(!this.isModified('password')) return next();

  const password = await hash(this.password, 12);
  this.set('password', password);

  next();
}

UserSchema.pre<User>('save', preSaveHook);

export async function passwordMatch(password: string): Promise<boolean> {
  return await compare(password, this.password);
}

UserSchema.methods.comparePassword = passwordMatch;