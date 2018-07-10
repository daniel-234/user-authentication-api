import request from 'supertest';
import app from '../server';
/*
 * Test the api
 */
describe('Test the root path', () => {
  test('It should return the correct response to the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Basic routing setting is ok!');
  });
});
