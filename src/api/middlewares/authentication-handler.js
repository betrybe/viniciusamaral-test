const tokenService = require('../services/token.services');

const authenticationHandler = (req, res, next) => {
  const userToken = tokenService.validate(req.headers.authorization);
  req.user = userToken;

  next();
};

module.exports = authenticationHandler;