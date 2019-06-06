const User = require('../models/User');
const { Router } = require('express');
// const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      name,
      handle,
      password
    } = req.body;
    User
      .create({ name, handle, password })
      .then(user => {
        const token = user.authToken();
        res.cookie('session', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
        });
        res.send({ user });
      })
      .catch(next);
  })

  .post('/signin', (req, res, next) => {
    const { handle, password } = req.body;
    User
      .signIn(handle, password)
      .then(results => {
        if(!results) {
          const error = new Error('Invalid login');
          error.status = 401;
          res.send(error);
          return next(error);
        }
        const { token } = results;
        res.cookie('session', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
        });
        User.findByToken(token)
          .then(untokenized => res.send(untokenized));
      })
      .catch(next);
  });
