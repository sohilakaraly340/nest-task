import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  age: Number,
  role: String,
});
