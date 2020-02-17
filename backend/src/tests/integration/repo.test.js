/*eslint-disable*/
const request = require('supertest');

const Repository = require('../../models/Repository');
const User = require('../../models/User');
const randString = require('../utils/randString');

let server;
let token;
let authPayload;
let bodyPayload;
let repoId;

describe('repositories', () => {
  beforeEach(() => {
    repoId = 20; // Valid repo id
    server = require('../../index');
    authPayload = {
      id: 4,
      is_admin: true,
    };
    const name = randString(7);
    bodyPayload = {
      name,
      permission: 'admin' // Valid permission
    };
    token = new User(authPayload).genAuthToken();

   });
  afterEach(async() => { await server.close() });

  describe('GET', () => {
    it('should return 200 if repos is found', async() => {
      const res = await request(server).get('/api/repos');
      expect(res.status).toBe(200);
    });

    it('should return 400 if user is invalid', async() => {
      authPayload.id = 1111;
      token = new User(authPayload).genAuthToken();
      const res = await request(server).get('/api/myrepos').set('x-auth-token', token);

      expect(res.status).toBe(400);
    });

    it('should return 200 if user is valid', async() => {
      const res = await request(server).get('/api/myrepos').set('x-auth-token', token);

      expect(res.status).toBe(200);
    });
  });

  describe('POST', () => {
    it('should return 400 if name empty', async() => {
      bodyPayload.name = '';
      const res = await request(server).post('/api/repos').send(bodyPayload).set('x-auth-token', token);
      expect(res.status).toBe(400); 
    });

    it('should return 400 if permission is invalid', async() => {
      bodyPayload.permission = 'invalidPermission';
      const res = await request(server).post('/api/repos').send(bodyPayload).set('x-auth-token', token);
      expect(res.status).toBe(400); 
    });

    it('should return 400 if user is invalid', async() => {
      authPayload.id = 1111;
      token = new User(authPayload).genAuthToken();
      const res = await request(server).post('/api/repos').send(bodyPayload).set('x-auth-token', token);
      expect(res.status).toBe(400);
    });

    it('should return 400 if repository name is already in use', async() => {
      bodyPayload.name = 'public' // Name already in use
      const res = await request(server).post('/api/repos').send(bodyPayload).set('x-auth-token', token);
      expect(res.status).toBe(400);
    });

    it('should return 403 if user is unauthorized to create an admin repo', async() => {
      authPayload.id = 23 // Not admin user
      token = new User(authPayload).genAuthToken();
      bodyPayload.permission = 'admin';
      const res = await request(server).post('/api/repos').send(bodyPayload).set('x-auth-token', token);
      expect(res.status).toBe(403);
    });

    it('should return 200 if repo has created', async() => {
      const res = await request(server).post('/api/repos').send(bodyPayload).set('x-auth-token', token);
      expect(res.status).toBe(200);
    });
  });

  describe('PUT', () => {
    it('should return 400 if name empty', async() => {
      bodyPayload.name = '';
      const res = await request(server).put(`/api/repos/${repoId}`).send(bodyPayload).set('x-auth-token', token);
      expect(res.status).toBe(400); 
    });

    it('should return 400 if permission is invalid', async() => {
      bodyPayload.permission = 'invalidPermission';
      const res = await request(server).put(`/api/repos/${repoId}`).send(bodyPayload).set('x-auth-token', token);
      expect(res.status).toBe(400); 
    });

    it('should return 400 if repo id is invalid', async() =>  {
      repoId = 9999; // Invalid id
      const res = await request(server).put(`/api/repos/${repoId}`).send(bodyPayload).set('x-auth-token', token);
      expect(res.status).toBe(400); 
    });

    it('should return 403 if user is unauthorized to update an admin repo', async() => {
      authPayload.is_admin = false // Not admin user
      token = new User(authPayload).genAuthToken();
      repoId = 18 // Admin repository
      const res = await request(server).put(`/api/repos/${repoId}`).send(bodyPayload).set('x-auth-token', token);
      expect(res.status).toBe(403);
    });

    it('should return 403 if user is not the repository owner', async() => {
      authPayload.is_admin = false;
      authPayload.id = 23 // Not owner of repo id 17
      token = new User(authPayload).genAuthToken();
      const res = await request(server).put(`/api/repos/${repoId}`).send(bodyPayload).set('x-auth-token', token);
      expect(res.status).toBe(403);
    });

    it('should return 403 if user is not admin and is trying to update for a admin repo', async() => {
      authPayload.is_admin = false;
      token = new User(authPayload).genAuthToken();
      const res = await request(server).put(`/api/repos/${repoId}`).send(bodyPayload).set('x-auth-token', token);
      expect(res.status).toBe(403);
    });

    it('should return 200 if repo has updated', async() => {
      const res = await request(server).put(`/api/repos/${repoId}`).send(bodyPayload).set('x-auth-token', token);
      expect(res.status).toBe(200);
    });
  });

  describe('DELETE', () => {
    it('should return 400 if user is not found', async() => {
      authPayload.id = 1111 // Invalid user id
      token = new User(authPayload).genAuthToken();
      const res = await request(server).delete(`/api/repos/${repoId}`).set('x-auth-token', token);
      expect(res.status).toBe(400);
    });

    it('should return 400 if repository is not found', async() => {
      repoId = 1111 // Invalid repo id
      const res = await request(server).delete(`/api/repos/${repoId}`).set('x-auth-token', token);
      expect(res.status).toBe(400);
    });

    it('should return 403 if user is not an admin and not the repo owner', async() => {
      authPayload.id = 23; // Not the repo owner
      token = new User(authPayload).genAuthToken();
      authPayload.is_admin = false;
      const res = await request(server).delete(`/api/repos/${repoId}`).set('x-auth-token', token);
      expect(res.status).toBe(403);
    });

    it('should return 200 if repo has deleted', async() => {
      const res = await request(server).delete(`/api/repos/${repoId}`).set('x-auth-token', token);
      expect(res.status).toBe(200);
    });
  });
});
