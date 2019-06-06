const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  caption: {
    type: String
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  versionKey: false
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
