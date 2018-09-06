import { controllers } from '../query';
const Instructor = {};

describe('Controllers in `query', () => {
  // describe('createOne', () => {
  //   test('should create a document', async () => {
  //     const document = await controllers.createOne(Instructor, {
  //       username: 'instructor1'
  //     });
  //     expect(document).toEqual('instructor1');
  //   });
  // });

  describe('getAll', () => {
    test('should get all documents', async () => {
      const documents = await controllers.getAll(Instructor);

      expect(documents).toHaveProperty('message');
    });
  });
});
