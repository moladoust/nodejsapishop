const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, minlength: 3, maxlength: 200, required: true },
  description: { type: String, minlength: 5, maxlength: 500, required: true },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
