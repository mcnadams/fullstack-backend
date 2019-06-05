const Photo = require('../../lib/models/Photo');
const mongoose = require('mongoose');

describe('Photo model', () => {
  it('has what we expect', () => {
    const photo = new Photo({
      url: './path/toPhoto',
      caption: 'cool photo'
    });

    expect(photo.toJSON()).toEqual({
      url: './path/toPhoto',
      caption: 'cool photo',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
