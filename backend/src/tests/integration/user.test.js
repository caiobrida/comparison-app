/*eslint-disable*/
const request = require('supertest');

const User = require('../../models/User');
const randString = require('../utils/randString');

let server;
let token;

describe('user', () => {
  beforeEach(() => { server = require('../../index'); });
  afterEach(async() => {
    await server.close(); 
  });

  describe('GET', () => {
    it('should return 200 if user is found', async() => {
      const payload = {
        id: 4,
        name: 'test',
        email: 'test@test.com',
      }
      token = new User(payload).genAuthToken();
      const res = await request(server).get('/api/me').set('x-auth-token', token);
  
      expect(res.status).toBe(200);
    });

    describe('POST', () => {
      it('should return 400 if user already exists', async() => {
        const payload = {
          name: 'name',
          email: 'user@outlook.com',
          password: 'password',
        };
        const res = await request(server).post('/api/users').send(payload);
        expect(res.status).toBe(400);
      });

      it('should return 200 if user is valid', async() => {
        const string = randString(7);
        const email = `${string}@gmail.com`;
        const payload = {
          name: 'name',
          email,
          password: 'password',
        };
        const res = await request(server).post('/api/users').send(payload);
        expect(res.status).toBe(200);
      });
    });

    describe('PUT', () => {
      it('should return 400 if user is not found', async() => {
        const payload = {
          id: 11111,
          name: 'test',
        };
        token = new User(payload).genAuthToken();
        const res = await request(server).put('/api/users').set('x-auth-token', token);

        expect(res.status).toBe(400);
      });

      it('should return 200 if user is found', async() => {
        const payload = {
          id: 4, // Valid id
          name: 'test',
        };
        token = new User(payload).genAuthToken();
        const res = await request(server).put('/api/users').set('x-auth-token', token);

        expect(res.status).toBe(200);
      });
    });
  });
});
