import request from 'supertest';
import app from '../server';
import mongoose from 'mongoose';
import { User } from '../api/resources/user/userModel';
import { Instructor } from '../api/resources/instructor/instructorModel';

const dbUrl = `mongodb://localhost/api_design_fe_masters`;
let db;
let user;

/*
 * Test the api
 */

beforeAll(async () => {
  mongoose.connect(dbUrl);
  db = mongoose.connection;
  user = await User.create({ username: 'user1' });
  const instructor = await Instructor.create({ username: 'instructor1' });
});

afterAll(() => {
  db.dropDatabase();
});

describe('Test the root paths', () => {
  test('The root path is working', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Basic routing setting is ok!');
  });
});

describe('GET should get all resources', () => {
  test('GET /user', async () => {
    const response = await request(app).get('/api/user');
    expect(response).toHaveProperty('status', 200);
  });

  test('GET /instructor', async () => {
    const response = await request(app).get('/api/instructor');
    expect(response).toHaveProperty('status', 200);
  });
});
