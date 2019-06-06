const chance = require('chance').Chance();
const Photo = require('../../lib/models/Photo');
const Comment = require('../../lib/models/Comment');
const mongoose = require('mongoose');

function seedPhotos(photoCount = 10) {
  const photos = [...Array(photoCount)].map(() => ({
    url: chance.url(),
    caption: chance.sentence(),
    userId: new mongoose.Types.ObjectId()
  }));
  return Photo.create(photos);
}

async function seedComments(commentCount = 20) {
  const photos = await seedPhotos();
  const comments = [...Array(commentCount)].map(() => ({
    photoId: chance.pickone(photos)._id,
    body: chance.sentence(),
    userId: new mongoose.Types.ObjectId()
  }));
  return Comment.create(comments);
}

module.exports = seedComments;
