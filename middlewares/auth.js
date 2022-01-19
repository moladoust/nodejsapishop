const tokenService = require('../services/token');

module.exports = {
  verifyUser: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: 'No token',
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (
      response.role == 'Administrator' ||
      response.role == 'Seller' ||
      response.role == 'Storekeeper'
    ) {
      next();
    } else {
      return res.status(403).send({
        message: 'Not authorized',
      });
    }
  },
  verifyAdministrator: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: 'No token',
      });
    }
    const response = await tokenService.decode(req.headers.token);
    console.log(response);
    if (response.role == 'Administrator') {
      next();
    } else {
      return res.status(403).send({
        message: 'Not authorized',
      });
    }
  },
  verifyStorekeeper: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: 'No token',
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.role == 'Storekeeper' || response.role == 'Administrator') {
      next();
    } else {
      return res.status(403).send({
        message: 'Not authorized',
      });
    }
  },
  verifySeller: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: 'No token',
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.role == 'Seller' || response.role == 'Administrator') {
      next();
    } else {
      return res.status(403).send({
        message: 'Not authorized',
      });
    }
  },
};
