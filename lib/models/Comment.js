const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  photoId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Photo'
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  body: {
    type: String,
    required: true
  }
},
{
  versionKey: false
}
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
