const User = require('../models/User');

export default const ensureAuth = (req, res, next) => {
  return User
    .findByToken(req.cookies.session)
    .then(user => {
      if(!user) {
        const error = new Error('Invalid Authorization');
        error.status = 400;
        return next(error);
      }
      req.user = user;
      next();
    });
};