/*eslint-disable*/
const request = require('supertest');
const User = require('../../models/User');
const randString = require('../utils/randString');

let server;
let token;
let authPayload;
let bodyPayload;
let repoId;
let compId;
let compName;

describe('comparisons', () => {
  beforeEach(() => {
    repoId = 21; // Valid repo id
    compId = 27; // Valid comp id
    compName = 'comparison'; // Valid comp name

    server = require('../../index');
    authPayload = {
      id: 4,
      is_admin: true,
    };
    const name = randString(7);
    bodyPayload = {
      name,
      img1: 'img.png',
      img2: 'img2.png',
    };
    token = new User(authPayload).genAuthToken();

   });
  afterEach(async() => { await server.close() });


  describe('GET', () => {
    it('should return 400 if comparisons repository is not found', async() => {
      repoId = 99999 // Invalid repo id
      const res = await request(server).get(`/api/comparisons/${repoId}`);
      expect(res.status).toBe(400);
    });

    it('should return 200 if comparisons repository is valid', async() => {
      const res = await request(server).get(`/api/comparisons/${repoId}`);
      expect(res.status).toBe(200);
    });

    it('should return 400 if comparisons is not found', async() => {
      compId = 9999 // Invalid comp id
      const res = await request(server).get(`/api/comparisons/show/${compId}`);
      expect(res.status).toBe(400);
    });

    it('should return 200 if comparisons repository is valid', async() => {
      const res = await request(server).get(`/api/comparisons/show/${compId}`);
      expect(res.status).toBe(200);
    });
  });

  describe('POST', () => {
    it('should return 400 if body is invalid', async() => {
      bodyPayload.name = '';
      const res = await request(server).post(`/api/comparisons/${repoId}`).send(bodyPayload).set('x-auth-token', token);
      expect(res.status).toBe(400);
    });

    it('should return 400 if repo id is invalid', async() => {
      repoId = 9999; //Invalid id
      const res = await request(server).post(`/api/comparisons/${repoId}`).send(bodyPayload).set('x-auth-token', token);
      expect(res.status).toBe(400);
    });

    it('should return 400 if comparison name is already in use', async() => {
      repoId = 18;
      bodyPayload.name = 'comparison'; // Name in use in repo 18
      const res = await request(server).post(`/api/comparisons/${repoId}`).send(bodyPayload).set('x-auth-token', token);
      expect(res.status).toBe(400);
    });

    it('should return 200 if comparison is created', async() => {
      const res = await request(server).post(`/api/comparisons/${repoId}`).send(bodyPayload).set('x-auth-token', token);
      expect(res.status).toBe(200);
    });
  });
  describe('PUT', () => {
    it('should return 400 if comparison is not found', async() => {
      compName = 'InvalidName';
      const res = await request(server).put(`/api/comparisons/${repoId}/${compName}`).set('x-auth-token', token);
      expect(res.status).toBe(400);
    });

    it('should return 200 if comparison is updated', async() => {
      repoId = 18;
      const res = await request(server).put(`/api/comparisons/${repoId}/${compName}`).send(bodyPayload).set('x-auth-token', token);
      expect(res.status).toBe(200);
    });
  });
  describe('DELETE', () => {
    it('should return 400 if comparison is not found', async() => {
      compName = 'Invalid Name';
      const res = await request(server).delete(`/api/comparisons/${repoId}/${compName}`).set('x-auth-token', token);
      expect(res.status).toBe(400);
    });

    it('should return 200 if comparison has successfuly deleted', async() => {
      repoId = 18;
      const res = await request(server).delete(`/api/comparisons/${repoId}/${compName}`).set('x-auth-token', token);
      expect(res.status).toBe(200);
    });
  });
});
