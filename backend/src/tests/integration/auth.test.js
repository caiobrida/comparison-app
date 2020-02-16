/*eslint-disable*/
const request = require('supertest');

const User = require('../../models/User');
let server;

describe('auth', () => {
  beforeEach(() => { server = require('../../index') });
  afterEach(async () => {
    await server.close();
  });

  let token;

  function exec() {
    return request(server)
      .get('/api/me')
      .set('x-auth-token', token);
  }

  beforeEach(() => {
    token = new User().genAuthToken();
  });

  it('should return 401 if no token is provided', async () => {
    token = '';

    const res = await exec();
    expect(res.status).toBe(401);
  });

  it('should return 400 if token is invalid', async () => {
    token = 'a';

    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 200 if token valid', async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });

  it('should return 400 if user email is not found', async() => {
    const res = await request(server).post('/api/auths', {
      email: 'invalid@email.com',
      password: '123456',
    });

    expect(res.status).toBe(400);
  });

  it('should return 400 if user password is not valid', async() => {
    const res = await request(server).post('/api/auths', {
      email: 'user@outlook.com', // Email must be a valid one
      password: 'invalidpassword',
    });

    expect(res.status).toBe(400);
  });
});