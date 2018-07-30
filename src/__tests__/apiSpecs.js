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
    expect(response.text).toBe('user root end point');
  });

  test('The instructor path is working', async () => {
    const response = await request(app).get('/api/instructor');
    expect(response.text).toBe('this is the intructor root end point');
  });
});
