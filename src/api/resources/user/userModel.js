import mongoose from 'mongoose';

export const schema = {
  username: {
    type: String,
    required: true,
    unique: true
  }
};

const userSchema = new mongoose.Schema(schema, { timestamps: true });

export const User = mongoose.model('user', userSchema);
