const Comment = require('../../lib/models/Comment');
const mongoose = require('mongoose');

describe('Comment model', () => {
  it('has what we expect', () => {
    const comment = new Comment({
      photoId: new mongoose.Types.ObjectId(),
      body: 'cool Comment',
      userId: new mongoose.Types.ObjectId()
    });

    expect(comment.toJSON()).toEqual({
      photoId: expect.any(mongoose.Types.ObjectId),
      userId: expect.any(mongoose.Types.ObjectId),
      body: 'cool Comment',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
