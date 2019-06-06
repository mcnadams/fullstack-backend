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
  });
