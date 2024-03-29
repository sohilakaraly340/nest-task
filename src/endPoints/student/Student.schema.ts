import * as mongoose from 'mongoose';
export let studentSchema = new mongoose.Schema({
  id: Number,
  name: String,
  age: Number,
  email: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});
