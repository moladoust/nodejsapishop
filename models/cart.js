const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: Schema.ObjectId, ref: 'user', required: true },
  person: { type: Schema.ObjectId, ref: 'person', required: true },
  cupon_type: { type: String, maxlength: 20, required: true },
  cupon_serie: { type: String, maxlength: 7 },
  cupon_num: { type: String, maxlength: 10, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  details: [
    {
      _id: {
        type: String,
        required: true,
      },
      article: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});
const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;
