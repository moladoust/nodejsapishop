const models = require('../models');

module.exports = {
  store: async (req, res, next) => {
    try {
      const reg = await models.Person.create(req.body);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'An error occurred in the proccess...',
      });
      next(e);
    }
  },
  show: async (req, res, next) => {
    try {
      const reg = await models.Person.findOne({ _id: req.query._id });
      if (!reg) {
        res.status(404).send({
          message: 'record does not exist',
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (e) {
      res.status(500).send({
        message: 'An error occurred in the proccess...',
      });
      next(e);
    }
  },
  index: async (req, res, next) => {
    try {
      let value = req.query.value;
      const reg = await models.Person.find(
        {
          $or: [
            { name: new RegExp(value, 'i') },
            { email: new RegExp(value, 'i') },
          ],
        },
        { createdAt: 0 }
      ).sort({ createdAt: -1 });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'An error occurred in the proccess...',
      });
      next(e);
    }
  },
  clientsList: async (req, res, next) => {
    try {
      let value = req.query.value;
      const reg = await models.Person.find(
        {
          $or: [
            { name: new RegExp(value, 'i') },
            { email: new RegExp(value, 'i') },
          ],
          person_type: 'Client',
        },
        { createdAt: 0 }
      ).sort({ createdAt: -1 });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'An error occurred in the proccess...',
      });
      next(e);
    }
  },
  suppliersList: async (req, res, next) => {
    try {
      let value = req.query.value;
      const reg = await models.Person.find(
        {
          $or: [
            { name: new RegExp(value, 'i') },
            { email: new RegExp(value, 'i') },
          ],
          person_type: 'Supplier',
        },
        { createdAt: 0 }
      ).sort({ createdAt: -1 });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'An error occurred in the proccess...',
      });
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const reg = await models.Person.findByIdAndUpdate(
        { _id: req.body._id },
        {
          person_type: req.body.person_type,
          name: req.body.name,
          doc_type: req.body.doc_type,
          doc_num: req.body.doc_num,
          direction: req.body.direction,
          tell: req.body.tell,
          email: req.body.email,
        }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'An error occurred in the proccess...',
      });
      next(e);
    }
  },
  destroy: async (req, res, next) => {
    try {
      const reg = await models.Person.findByIdAndDelete({ _id: req.body._id });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'An error occurred in the proccess...',
      });
      next(e);
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await models.Person.findByIdAndUpdate(
        { _id: req.body._id },
        { status: 1 }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'An error occurred in the proccess...',
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.Person.findByIdAndUpdate(
        { _id: req.body._id },
        { status: 0 }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'An error occurred in the proccess...',
      });
      next(e);
    }
  },
};
