require('../utils/data-helper');
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');


describe('comment route tests', () => {

  it('posts a comment', () => {
    return request(app)
      .post('/api/v1/comment')
      .send({
        photoId: new mongoose.Types.ObjectId(),
        body: 'Hello',
        name: 'Bonnie'
      })
      .then(res => {
        expect(res.body).toEqual({
          photoId: expect.any(String),
          body: 'Hello',
          name: 'Bonnie',
          _id: expect.any(String)
        });
      });
  });

  it('gets comments by photo id', () => {
    return request(app)
      .post('/api/v1/')
      .send({
        url: './path/toPhoto',
        caption: 'cool photo!'
      })
      .then(res => res.body)
      .then(photo => {
        return request(app)
          .post('/api/v1/comment')
          .send({
            photoId: photo._id,
            body: 'Hello',
            name: 'Bonnie'
          })
          .then(() => {
            return request(app)
              .post('/api/v1/comment')
              .send({
                photoId: photo._id,
                body: 'Hello',
                name: 'Bonnie'
              })
              .then(() => {
                return request(app)
                  .get(`/api/v1/comment/${photo._id}`)
                  .then(res => {
                    expect(res.body).toHaveLength(2);
                  });
              });
          });
      });
  });

  it('deletes a comment', () => {
    return request(app)
      .post('/api/v1/comment')
      .send({
        photoId: new mongoose.Types.ObjectId(),
        body: 'Hello',
        name: 'Bonnie'
      })
      .then(res => {
        console.log('####', res.body._id);
        return request(app)
          .delete(`/api/v1/comment/${res.body._id}`)
          .then(res => {
            expect(res.body).toEqual({
              photoId: expect.any(String),
              body: 'Hello',
              name: 'Bonnie',
              _id: expect.any(String)
            });
          });
      });
  });

});
