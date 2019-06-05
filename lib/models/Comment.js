const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  photoId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Photo'
  },
  body: {
    type: String,
    required: true
  },
  name: {
    type: String
  }
},
{
  versionKey: false
}
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
