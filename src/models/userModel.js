import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please add a valid email']
  },
  age: {
    type: Number,
    required: [true, 'Please add age'],
    min: [0, 'Age must be a positive number']
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);