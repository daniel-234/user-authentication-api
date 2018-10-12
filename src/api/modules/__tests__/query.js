/*
 * Tests copied from the Frontend Matsers course
 * `REST & GraphQL Design in Node.js`.
 */
import mongoose from 'mongoose';
import MongodbMemoryServer from 'mongodb-memory-server';
import { controllers } from '../query';
import { User } from '../../resources/user/userModel';

let mongoServer;

/*
 * Test the api
 */

// Create a connection to the database before running any test.
beforeAll(async () => {
  mongoServer = new MongodbMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(
    mongoUri,
    err => {
      if (err) console.log(err);
    }
  );
});

// Close the connection and the mongod server after running all tests.
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Controllers in `query', () => {
  describe('createOne', () => {
    test('should create a document', async () => {
      const document = await controllers.createOne(User, {
        username: 'user1',
        passwordHash: 'abcd1234'
      });

      expect(document.id).toBeDefined();
      expect(document.username).toEqual('user1');
    });
  });

  describe('updateOne', () => {
    test('should update a document', async () => {
      const user = await controllers.createOne(User, {
        username: 'user2',
        passwordHash: 'abcd1234'
      });

      const newUserName = 'newUser2';
      const updatedUser = await controllers.updateOne(user, {
        username: newUserName
      });

      expect(updatedUser.username).toEqual(newUserName);
      expect(updatedUser.id).toEqual(user.id);
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

      const user = await controllers.createOne(User, {
        username: 'user3',
        passwordHash: 'abcd1234'
      });

      const deletedUser = await controllers.deleteOne(user);

      expect(deletedUser.id).toEqual(user.id);
      expect(await User.findById(User.id)).toEqual(null);
    });
  });

  describe('getOne', () => {
    test('should get one document', async () => {
      const user = await controllers.createOne(User, {
        username: 'user3',
        passwordHash: 'abcd1234'
      });

      const foundUser = await controllers.getOne(user);

      expect(foundUser).toEqual(user);
    });
  });

  describe('findByParam', () => {
    test('should find a Model by Id', async () => {
      const user = (await controllers.createOne(User, {
        username: 'user4',
        passwordHash: 'abcd1234'
      })).toJSON();

      const foundUser = (await controllers.findByParam(
        User,
        user._id
      )).toJSON();

      expect(foundUser).toEqual(user);
    });
  });

  describe('getAll', () => {
    test('should get all documents', async () => {
      const usernames = ['user5', 'user6', 'user7'];

      const users = await Promise.all(
        usernames.map(async username => {
          const user = await controllers.createOne(User, {
            username,
            passwordHash: 'abcd1234'
          });
          return user.toJSON();
        })
      );

      const allUsers = (await controllers.getAll(User)).map(user =>
        user.toJSON()
      );

      expect(allUsers).toHaveLength(7);
    });
  });
});
