require('../utils/data-helper');
const request = require('supertest');
const app = require('../../lib/app');

describe('photo route tests', () => {

  it('posts a photo', () => {
    return request(app)
      .post('/api/v1/')
      .send({
        url: './path/toPhoto',
        caption: 'cool photo!'
      })
      .then(res => {
        expect(res.body).toEqual({
          url: './path/toPhoto',
          caption: 'cool photo!',
          _id: expect.any(String)
        });
      });
  });

  it('gets all photos', () => {
    return request(app)
      .get('/api/v1/')
      .then(res => {
        expect(res.body).toHaveLength(10);
      });
  });

  it('gets a photo by id', () => {
    return request(app)
      .post('/api/v1/')
      .send({
        url: './path/toPhoto',
        caption: 'cool photo!'
      })
      .then(res => {
        return request(app)
          .get(`/api/v1/${res.body._id}`)
          .then(res => {
            expect(res.body).toEqual({
              url: './path/toPhoto',
              caption: 'cool photo!',
              _id: expect.any(String)
            });
          });
      });
  });

  it('deletes a photo', () => {
    return request(app)
      .post('/api/v1/')
      .send({
        url: './path/toPhoto',
        caption: 'cool photo!'
      })
      .then(res => {
        return request(app)
          .delete(`/api/v1/${res.body._id}`)
          .then(res => {
            expect(res.body).toEqual({
              url: './path/toPhoto',
              caption: 'cool photo!',
              _id: expect.any(String)
            });
          });
      });
  });

});
