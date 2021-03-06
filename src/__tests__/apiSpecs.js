import request from 'supertest';
import app from '../server';
import mongoose from 'mongoose';
import MongodbMemoryServer from 'mongodb-memory-server';

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

describe('GET should get all resources', () => {
  test('GET /users', async () => {
    const response = await request(app).get('/api/users');
    expect(response).toHaveProperty('status', 200);
  });

  test('GET /instructors', async () => {
    const response = await request(app).get('/api/instructors');
    expect(response).toHaveProperty('status', 200);
  });
});

// TODO
// It doesn't create a separate db
// Check later for issues related with Jest, Mongo and Mongoose
describe('POST should create a resource', () => {
  test.skip('POST /users', async () => {
    const response = await request(app)
      .post('/api/users')
      /*
       * Sends a JSON post body.
       *
       * >> See documentation of supertest and superagent.
       *
       * https://github.com/visionmedia/supertest
       * https://github.com/visionmedia/superagent
       */
      .send({ username: 'newUser', password: 'ytrewq4321' });
    expect(response).toHaveProperty('status', 201);
    expect(response).toHaveProperty('text');
  });

  test.skip('POST /instructors', async () => {
    const response = await request(app)
      .post('/api/instructors')
      .send({ username: 'newInstructor' });
    expect(response).toHaveProperty('status', 201);
  });
});
