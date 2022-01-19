const { Category } = require('../models');
const mongoose = require('mongoose');

module.exports = {
  index: async (req, res, next) => {
    const query = req.query.q;

    try {
      const result = await Category.find(
        {
          $or: [
            { name: new RegExp(query, 'i') },
            { description: new RegExp(query, 'i') },
          ],
        },
        { createdAt: 1 }
      ).sort({ name: 1 });

      res.status(200).json(result);
    } catch (e) {
      console.log(e.message);
      res.status(500).send({
        message: 'There is some error in listing...',
      });
      next(e);
    }
  },
  show: async (req, res, next) => {
    try {
      const id = req.params.id;
      if (!id || mongoose.Types.ObjectId.isValid(id))
        throw Error('there is no id.');

      const result = await Category.findOne({ _id: id });
      if (!result) {
        return res.status(404).send({
          message: 'there is no result.',
        });
      }

      res.status(200).send(result);
    } catch (e) {
      console.log(e.message);
      res.status(500).send({
        message: 'there is some error in searching this item.',
      });
      next(e);
    }
  },
  store: async (req, res, next) => {
    try {
      console.log(req.body);
      const data = {
        name: req.body.name,
        description: req.body.description,
        status: 1,
      };
      const result = await Category.create(data);
      res.status(200).json(result);
    } catch (e) {
      res.status(500).send({
        message: 'there is some error in storing.',
      });
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      console.log(req.body);

      const result = await Category.findByIdAndUpdate(
        id,
        {
          name: req.body.name,
          description: req.body.description,
        },
        { new: true } // to return new doc data.
      );
      res.status(200).json(result);
    } catch (e) {
      res.status(500).send({
        message: 'there is some error in update',
      });
      next(e);
    }
  },
  destroy: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Category.findByIdAndRemove(id);
      res.status(200).json(result);
    } catch (e) {
      res.status(500).send({
        message: 'there is some error in deleting.',
      });
      next(e);
    }
  },
  activate: async (req, res, next) => {
    const id = req.params.id;

    try {
      const result = await Category.findByIdAndUpdate(
        id,
        {
          status: 1,
        },
        { new: true }
      );
      res.status(200).json(result);
    } catch (e) {
      res.status(500).send({
        message: 'there is some error in activation.',
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    const id = req.params.id;

    try {
      const result = await Category.findByIdAndUpdate(
        id,
        {
          status: 0,
        },
        { new: true }
      );
      res.status(200).json(result);
    } catch (e) {
      res.status(500).send({
        message: 'there is some error in activation.',
      });
      next(e);
    }
  },
};
