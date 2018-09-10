/*
 * Tests copied from the Frontend Matsers course
 * `REST & GraphQL Design in Node.js`.
 */
import { controllers } from '../query';
const Instructor = {};

describe('Controllers in `query', () => {
  describe('createOne', () => {
    test('should create a document', async () => {
      const document = await controllers.createOne(Instructor, {
        username: 'instructor2'
      });

      expect(document.id).toBeDefined();
      expect(document).toEqual('instructor2');
    });
  });

  describe('updateOne', () => {
    test('should update a document', async () => {
      const instructor = await controllers.createOne(Instructor, {
        username: 'instructor5'
      });

      const newInstructor = 'newInstructor5';
      const updatedInstructor = await controllers.updateOne(instructor, {
        username: newInstructorName
      });

      expect(updatedInstructor.username).toEqual(newInstructorName);
      expect(updatedInstructor.id).toEqual(instructor.id);
    });
  });

  describe('deleteOne', () => {
    test('should delete a document', async () => {
      const instructor = await controllers.createOne(Instructor, {
        username: 'instructor4'
      });

      const deletedInstructor = await controllers.deleteOne(instructor);

      expect(deletedInstructor.id).toEqual(instructor.id);
      expect(await Instructor.findById(Instructor.id)).toEqual(null);
    });
  });

  describe('getOne', () => {
    test('should get one document', async () => {
      const instructor = await controllers.createOne(Instructor, {
        username: 'instructor4'
      });

      const foundInstructor = await controllers.getOne(instructor);

      expect(foundInstructor).toEqual(instructor);
    });
  });

  describe('getAll', () => {
    test('should get all documents', async () => {
      const usernames = ['instructor10', 'instructor20'];

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

      expect(allInstructors).toHaveLength(instructors.length);
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
});
