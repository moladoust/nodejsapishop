const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  role: { type: String, maxlength: 30, required: true },
  name: { type: String, maxlength: 50, unique: true, required: true },
  doc_type: { type: String, maxlength: 20 },
  doc_num: { type: String, maxlength: 20 },
  direction: { type: String, maxlength: 70 },
  tell: { type: String, maxlength: 20 },
  email: { type: String, maxlength: 50, unique: true, required: true },
  password: { type: String, maxlength: 64, required: true },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('user', userSchema);
module.exports = User;
