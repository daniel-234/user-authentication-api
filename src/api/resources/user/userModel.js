import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Exported for unit testing purporses in `userSpec.js`.
export const schema = {
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
};

const userSchema = new mongoose.Schema(schema, { timestamps: true });

userSchema.methods = {
  authenticate(plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  hashPassword(plainTextPassword) {
    if (!plainTextPassword) {
      throw new Error('Could not save user');
    }

    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainTextPassword, salt);
  }
};

export const User = mongoose.model('user', userSchema);
