const Comment = require('../../lib/models/Comment');
const mongoose = require('mongoose');

describe('Comment model', () => {
  it('has what we expect', () => {
    const comment = new Comment({
      photoId: new mongoose.Types.ObjectId(),
      body: 'cool Comment',
      name: 'Bonnie'
    });

    expect(comment.toJSON()).toEqual({
      photoId: expect.any(mongoose.Types.ObjectId),
      body: 'cool Comment',
      name: 'Bonnie',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
