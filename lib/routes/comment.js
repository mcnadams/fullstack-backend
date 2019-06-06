const Comment = require('../models/Comment');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    //client gets photoId from req params
    const { photoId, body, name } = req.body;
    Comment
      .create({ photoId, body, name })
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

  .delete('/:commentId', (req, res, next) => {
    Comment
      .findByIdAndDelete(req.params.commentId)
      .lean()
      .then(deletedComment => res.send(deletedComment))
      .catch(next);
  });
