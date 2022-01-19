const { Article } = require('../models');

module.exports = {
  index: async (req, res, next) => {
    const query = req.query.q;

    try {
      const result = await Article.find(
        {
          $or: [
            { name: new RegExp(query, 'i') },
            { description: new RegExp(query, 'i') },
          ],
        },
        {
          createdAt: 0,
        }
      )
        .populate('category', { name: 1 })
        .sort({ name: 1 });

      res.status(200).json(result);
    } catch (e) {
      res.status(500).send({
        message: 'there is some error in showing article list.',
      });
      next(e);
    }
  },
  show: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Article.findOne({ _id: id }).populate('category', {
        name: 1,
      });

      if (!result) {
        return res.status(400).send({
          message: 'error in finding article.',
        });
      }
      res.status(200).json(result);
    } catch (e) {
      res.status(500).send({
        message: 'there is some error in showing this article.',
      });
      next(e);
    }
  },
  showByCode: async (req, res, next) => {
    const code = req.params.code;
    try {
      const result = await Article.findOne({ code: code }).populate(
        'category',
        {
          name: 1,
        }
      );

      if (!result) {
        return res.status(400).send({
          message: 'error in finding article.',
        });
      }
      res.status(200).json(result);
    } catch (e) {
      res.status(500).send({
        message: 'there is some error in showing this article.',
      });
      next(e);
    }
  },
  store: async (req, res, next) => {
    const data = {
      category: req.body.category,
      code: req.body.code,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      status: 1,
    };

    try {
      const result = await Article.create(data);
      res.status(200).json(result);
    } catch (e) {
      res.status(500).send({
        message: 'error in storing article.',
      });
    }
  },
  update: async (req, res, next) => {
    const data = {
      category: req.body.category,
      code: req.body.code,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
    };

    try {
      const result = await Article.findByIdAndUpdate(id, data, { new: true });
      res.status(200).json(result);
    } catch (e) {
      res.status(500).send({
        message: 'error in updating article.',
      });
    }
  },
  destroy: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Article.findByIdAndRemove(id);
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
      const result = await Article.findByIdAndUpdate(
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
      const result = await Article.findByIdAndUpdate(
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
