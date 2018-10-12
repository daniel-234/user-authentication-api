import { User, schema } from '../userModel';

describe('User Model', () => {
  test('should have username', () => {
    expect(schema).toHaveProperty('username');
    expect(schema.username.type).toEqual(String);
    expect(schema.username.required).toEqual(true);
    expect(schema.username.unique).toEqual(true);
  });

  test('should have passwordHash', () => {
    expect(schema).toHaveProperty('passwordHash');
    expect(schema.passwordHash.type).toEqual(String);
    expect(schema.passwordHash.required).toEqual(true);
  });
});
