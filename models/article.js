const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'category',
  },
  code: { type: String, maxlength: 64 },
  name: { type: String, required: true, maxlength: 200 },
  description: { type: String, required: true, maxlength: 500 },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

const Article = mongoose.model('article', articleSchema);

module.exports = Article;
