import mongoose from 'mongoose';

/*
 * This is a common pattern in every `model` file.
 * >> Create a schema, create a model, export the model.
 *
 */

/*
 * In a schema, the keys are the names of the fields you want.
 * Properties allow us to tell Mongoose which are the types of
 * the fields we want.
 * Mongoose uses the native types built inside of JavaScript
 * for the types.
 *
 */
export const schema = {
  firstname: {
    type: String,
    required: [true, 'First name required']
  },
  lastname: {
    type: String,
    required: [true, 'Last name required']
  },
  company: {
    type: String,
    required: [true, 'Company required'],
    unique: true
  }
};

/*
 * This is an instance of a `mongoose.Schema`. Using this method,
 * I'm creating a Mongoose schema for the `schema` object above,
 * that defines some rules.
 */
const instructorSchema = new mongoose.Schema(schema, { timestamps: true });

/*
 * Create a model from the schema defined above.
 */
export const Instructor = mongoose.model('instructor', instructorSchema);
