const { getAgent } = require('../utils/data-helper');
const mongoose = require('mongoose');


describe('comment route tests', () => {

  it('posts a comment', () => {
    return getAgent()
      .post('/api/v1/comment')
      .send({
        photoId: new mongoose.Types.ObjectId(),
        body: 'Hello',
        userId: new mongoose.Types.ObjectId()
      })
      .then(res => {
        expect(res.body).toEqual({
          photoId: expect.any(String),
          userId: expect.any(String),
          body: 'Hello',
          _id: expect.any(String)
        });
      });
  });

  it('gets comments by photo id', () => {
    return getAgent()
      .post('/api/v1/photos')
      .send({
        url: './path/toPhoto',
        caption: 'cool photo!',
        userId: new mongoose.Types.ObjectId()
      })
      .then(res => res.body)
      .then(photo => {
        return getAgent()
          .post('/api/v1/comment')
          .send({
            photoId: photo._id,
            userId: new mongoose.Types.ObjectId(),
            body: 'Hello',
          })
          .then(() => {
            return getAgent()
              .post('/api/v1/comment')
              .send({
                photoId: photo._id,
                userId: new mongoose.Types.ObjectId(),
                body: 'Hello',
              })
              .then(() => {
                return getAgent()
                  .get(`/api/v1/comment/${photo._id}`)
                  .then(res => {
                    expect(res.body).toHaveLength(2);
                  });
              });
          });
      });
  });

  it('deletes a comment', () => {
    return getAgent()
      .post('/api/v1/comment')
      .send({
        photoId: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(),
        body: 'Hello'
      })
      .then(res => {
        return getAgent()
          .delete(`/api/v1/comment/${res.body._id}`)
          .then(res => {
            expect(res.body).toEqual({
              photoId: expect.any(String),
              userId: expect.any(String),
              body: 'Hello',
              _id: expect.any(String)
            });
          });
      });
  });

});
