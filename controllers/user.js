const models = require('../models');

const bcrypt = require('bcryptjs');
const token = require('../services/token');

module.exports = {
  store: async (req, res, next) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const reg = await models.User.create(req.body);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Error at creating User',
      });
      next(e);
    }
  },
  show: async (req, res, next) => {
    try {
      const reg = await models.User.findOne({ _id: req.query._id });
      if (!reg) {
        res.status(404).send({
          message: 'record does not exist',
        });
      } else {
        res.status(200).send(reg);
      }
    } catch (e) {
      res.status(500).send({
        message: 'An error occurred when creating a User',
      });
      next(e);
    }
  },
  index: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const reg = await models.User.find(
        {
          $or: [
            { name: new RegExp(valor, 'i') },
            { email: new RegExp(valor, 'i') },
          ],
        },
        { createdAt: 0 }
      ).sort({ name: 1 });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'An error occurred while listing Users',
      });
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      let pas = req.body.password;
      if (pas.length < 64) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      const reg = await models.User.findByIdAndUpdate(
        { _id: req.body._id },
        { rol: req.body.rol },
        { name: req.body.name },
        { doc_type: req.body.doc_type },
        { doc_num: req.body.doc_num },
        { direccion: req.body.direccion },
        { tell: req.body.tell },
        { email: req.body.email },
        { password: req.body.password }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'An error occurred when updating a User',
      });
      next(e);
    }
  },
  destroy: async (req, res, next) => {
    try {
      const reg = await models.User.findByIdAndDelete({
        _id: req.body._id,
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'An error occurred when deleting a User',
      });
      next(e);
    }
  },

  activate: async (req, res, next) => {
    try {
      const reg = await models.User.findByIdAndUpdate(
        { _id: req.body._id },
        { status: 1 }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'An error occurred when creating a User',
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.User.findByIdAndUpdate(
        { _id: req.body._id },
        { status: 0 }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'An error occurred when creating a User',
      });
      next(e);
    }
  },
  login: async (req, res, next) => {
    try {
      let user = await models.User.findOne({ email: req.body.email });
      if (user) {
        let match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          let tokenReturn = await token.encode(user._id);
          res.status(200).json({ user, tokenReturn });
        } else {
          res.status(404).send({
            message: 'wrong password',
          });
        }
      } else {
        res.status(404).send({
          message: 'User does not exist',
        });
      }
    } catch (e) {
      res.status(404).send({
        message: 'communication error',
      });
      next(e);
    }
  },
};
