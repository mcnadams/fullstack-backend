require('dotenv').config();
const { getAgent } = require('../utils/data-helper');
const request = require('supertest');
const app = require('../../lib/app');

describe('auth route tests', () => {

  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        name: 'Leland',
        handle: 'viper',
        password: 'leland'
      })
      .then(res => {
        expect(res.body.user).toEqual({
          name: 'Leland',
          handle: 'viper',
          _id: expect.any(String)
        });
      });
  });

  it('signs in a user', () => {
    return getAgent()
      .post('/api/v1/auth/signin')
      .send({ handle: 'mcnadams', password: 'leland' })  
      .then(res => {
        expect(res.body).toEqual({
          name: 'Bonnie',
          handle: 'mcnadams',
          _id: expect.any(String)
        });
      });
  });


});
