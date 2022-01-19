const models = require('../models');

async function increaseStock(article, amount) {
  let { stock } = await models.Article.findOne({ _id: article });
  let nStock = parseInt(stock) + parseInt(amount);
  const reg = await models.Article.findByIdAndUpdate(
    { _id: article },
    { stock: nStock }
  );
}

async function decreaseStock(article, amount) {
  let { stock } = await models.Article.findOne({ _id: article });
  let nStock = parseInt(stock) - parseInt(amount);
  const reg = await models.Article.findByIdAndUpdate(
    { _id: article },
    { stock: nStock }
  );
}

module.exports = {
  store: async (req, res, next) => {
    try {
      const reg = await models.Cart.create(req.body);

      let details = req.body.details;
      details.map(function (x) {
        increaseStock(x._id, x.amount);
      });
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
      const reg = await models.Cart.findOne({ _id: req.query._id })
        .populate('user', { name: 1 })
        .populate('person', { name: 1 });
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
      const reg = await models.Cart.find(
        {
          $or: [
            { cupon_num: new RegExp(value, 'i') },
            { cupon_series: new RegExp(value, 'i') },
          ],
        },
        { createdAt: 0 }
      )
        .populate('user', { name: 1 })
        .populate('person', { name: 1 })
        .sort({ createdAt: -1 });
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
      const reg = await models.Cart.findByIdAndUpdate(
        { _id: req.body._id },
        { status: 1 }
      );

      let details = reg.details;
      details.map(function (x) {
        increaseStock(x._id, x.amount);
      });
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
      const reg = await models.Cart.findByIdAndUpdate(
        { _id: req.body._id },
        { status: 0 }
      );

      let details = reg.details;
      details.map(function (x) {
        decreaseStock(x._id, x.amount);
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'An error occurred in the proccess...',
      });
      next(e);
    }
  },
};
