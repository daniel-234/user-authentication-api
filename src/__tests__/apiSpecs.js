import request from 'supertest';
import app from '../server';
/*
 * Test the api
 */
describe('Test the root paths', () => {
  test('The root path is working', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Basic routing setting is ok!');
  });

  test('The user path is working', async () => {
    const response = await request(app).get('/api/user');
    expect(JSON.parse(response.text)).toHaveProperty(
      'message',
      'Root end point'
    );
  });

  test('The instructor path is working', async () => {
    const response = await request(app).get('/api/instructor');
    expect(JSON.parse(response.text)).toHaveProperty(
      'message',
      'Root end point'
    );
  });
});

describe('GET should get all resources', () => {
  test('GET /instructor', async () => {
    const response = await request(app).get('/api/instructor');
    expect(response).toHaveProperty('status', 200);
  });

  test('GET /user', async () => {
    const response = await request(app).get('/api/user');
    expect(response).toHaveProperty('status', 200);
  });
});

describe('POST should create a resource', () => {
  test('POST /instructor', async () => {
    const response = await request(app).post('/api/instructor');
    expect(response).toHaveProperty('status', 201);
  });

  test('POST /user', async () => {
    const response = await request(app).post('/api/user');
    expect(response).toHaveProperty('status', 201);
  });
});
