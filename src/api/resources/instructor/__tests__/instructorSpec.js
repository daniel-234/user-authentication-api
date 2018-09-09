import { Instructor, schema } from '../instructorModel';

describe('Instructor Model', () => {
  test('should have a username', () => {
    expect(schema).toHaveProperty('username');
    expect(schema.username.type).toEqual(String);
    expect(schema.username.required).toEqual(true);
    expect(schema.username.unique).toEqual(true);
  });
});
