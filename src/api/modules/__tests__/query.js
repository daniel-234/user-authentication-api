/*
 * Tests copied from the Frontend Matsers course
 * `REST & GraphQL Design in Node.js`.
 */
import mongoose from 'mongoose';
import { controllers } from '../query';
import { Instructor } from '../../resources/instructor/instructorModel';

const dbUrl = `mongodb://localhost/api_design_fe_masters`;
let db;

describe('Controllers in `query', () => {
  // Create a connection to the database before running any test.
  beforeAll(() => {
    mongoose.connect(dbUrl);
    db = mongoose.connection;
  });

  // Drop the database and close the connection after running all tests.
  afterAll(async () => {
    await db.dropDatabase();
    await mongoose.disconnect();
  });

  describe('createOne', () => {
    test('should create a document', async () => {
      const document = await controllers.createOne(Instructor, {
        username: 'instructor1'
      });

      expect(document.id).toBeDefined();
      expect(document.username).toEqual('instructor1');
    });
  });

  describe('updateOne', () => {
    test('should update a document', async () => {
      const instructor = await controllers.createOne(Instructor, {
        username: 'instructor2'
      });

      const newInstructorName = 'newInstructor2';
      const updatedInstructor = await controllers.updateOne(instructor, {
        username: newInstructorName
      });

      expect(updatedInstructor.username).toEqual(newInstructorName);
      expect(updatedInstructor.id).toEqual(instructor.id);
    });
  });

  describe('deleteOne', () => {
    test('should delete a document', async () => {
      /*
        * (Pause the execution of the `async` function and) wait for
        * the resolution of the Promise returned by this method call.
        * Here `controllers.createOne` returns a call to the Mongoose
        * method `Model.create(docs`), which evaluates to a Promise.
        */

      const instructor = await controllers.createOne(Instructor, {
        username: 'instructor3'
      });

      const deletedInstructor = await controllers.deleteOne(instructor);

      expect(deletedInstructor.id).toEqual(instructor.id);
      expect(await Instructor.findById(Instructor.id)).toEqual(null);
    });
  });

  describe('getOne', () => {
    test('should get one document', async () => {
      const instructor = await controllers.createOne(Instructor, {
        username: 'instructor3'
      });

      const foundInstructor = await controllers.getOne(instructor);

      expect(foundInstructor).toEqual(instructor);
    });
  });

  describe('findByParam', () => {
    test('should find a Model by Id', async () => {
      const instructor = (await controllers.createOne(Instructor, {
        username: 'instructor4'
      })).toJSON();

      const foundInstructor = (await controllers.findByParam(
        Instructor,
        instructor._id
      )).toJSON();

      expect(foundInstructor).toEqual(instructor);
    });
  });

  describe('getAll', () => {
    test('should get all documents', async () => {
      const usernames = ['instructor5', 'instructor6', 'instructor7'];

      const instructors = await Promise.all(
        usernames.map(async username => {
          const instructor = await controllers.createOne(Instructor, {
            username
          });
          return instructor.toJSON();
        })
      );

      const allInstructors = (await controllers.getAll(Instructor)).map(
        instructor => instructor.toJSON()
      );

      expect(allInstructors).toHaveLength(7);
    });
  });
});
