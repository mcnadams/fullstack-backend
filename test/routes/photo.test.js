const { getAgent } = require('../utils/data-helper');
const mongoose = require('mongoose');

describe('photo route tests', () => {

  it('posts a photo', () => {
    return getAgent()
      .post('/api/v1/photos')
      .send({
        url: './path/toPhoto',
        caption: 'cool photo!',
        userId: new mongoose.Types.ObjectId()
      })
      .then(res => {
        expect(res.body).toEqual({
          url: './path/toPhoto',
          caption: 'cool photo!',
          _id: expect.any(String),
          userId: expect.any(String)
        });
      });
  });

  it('gets all photos', () => {
    return getAgent()
      .get('/api/v1/photos')
      .then(res => {
        expect(res.body).toHaveLength(10);
      });
  });

  it('gets a photo by id', () => {
    return getAgent()
      .post('/api/v1/photos')
      .send({
        url: './path/toPhoto',
        caption: 'cool photo!',
        userId: new mongoose.Types.ObjectId()
      })
      .then(res => {
        return getAgent()
          .get(`/api/v1/photos/${res.body._id}`)
          .then(res => {
            expect(res.body).toEqual({
              url: './path/toPhoto',
              caption: 'cool photo!',
              _id: expect.any(String),
              userId: expect.any(String)
            });
          });
      });
  });

  it('deletes a photo', () => {
    return getAgent()
      .post('/api/v1/photos')
      .send({
        url: './path/toPhoto',
        caption: 'cool photo!',
        userId: new mongoose.Types.ObjectId()
      })
      .then(res => {
        return getAgent()
          .delete(`/api/v1/photos/${res.body._id}`)
          .then(res => {
            expect(res.body).toEqual({
              url: './path/toPhoto',
              caption: 'cool photo!',
              _id: expect.any(String),
              userId: expect.any(String)
            });
          });
      });
  });

});
