import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Exported for unit testing purporses in `userSpec.js`.
export const schema = {
  username: {
    type: String,
    required: [true, 'Username required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password required']
  },
  admin: {
    type: Boolean,
    required: true
  }
};

const userSchema = new mongoose.Schema(schema, { timestamps: true });

/*
 * Mongoose Middleware (pre-save hooks).
 */

/*
 * Check if the username is already in the database.
 */
userSchema.pre('save', function(next) {
  this.constructor.findOne({ username: this.username }, function(err, doc) {
    if (err) {
      next(err);
    }
    if (doc) {
      next(
        new Error('Username already taken. Please, insert a different one.')
      );
    }
    next();
  });
});

/*
 * Call a method to hash the newly inserted password.
 */
userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = this.hashPassword(this.password);
  next();
});

/*
 * Methods that act on user passwords.
 */
userSchema.methods = {
  /*
   * Return true if the hashed value of plainTextPassword matches
   * the hashed password.
   */
  authenticate(plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  /*
   * Hash the password using the `bcrypt` Node library.
   */
  hashPassword(plainTextPassword) {
    if (!plainTextPassword) {
      throw new Error('Could not save user');
    }

    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainTextPassword, salt);
  }
};

export const User = mongoose.model('user', userSchema);
