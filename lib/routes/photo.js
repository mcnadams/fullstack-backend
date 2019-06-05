const Photo = require('../models/Photo');
const { Router } = require('express');

module.exports = Router()

  .post('/', (req, res, next) => {
    const { url, caption } = req.body;
    Photo
      .create({ url, caption })
      .then(newPhoto => res.send(newPhoto))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Photo
      .find()
      .lean()
      .then(allPhotos => res.send(allPhotos))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Photo
      .findById(req.params.id)
      .lean()
      .then(photo => res.send(photo))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Photo
      .findByIdAndDelete(req.params.id)
      .lean()
      .then(deletedPhoto => res.send(deletedPhoto))
      .catch(next);
  });
