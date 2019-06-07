const Comment = require('../models/Comment');
const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    //client gets photoId from req params
    const { photoId, body, userId } = req.body;
    Comment
      .create({ photoId, body, userId })
      .then(newComment => res.send(newComment))
      .catch(next);
  })

  .get('/:photoId', (req, res, next) => {
    Comment
      .find({ photoId: req.params.photoId })
      .lean()
      .then(comments => res.send(comments))
      .catch(next);
  })

  .delete('/:commentId', ensureAuth, (req, res, next) => {
    Comment
      .findByIdAndDelete(req.params.commentId)
      .lean()
      .then(deletedComment => res.send(deletedComment))
      .catch(next);
  });
