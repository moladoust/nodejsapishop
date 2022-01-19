const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  person_type: { type: String, maxlength: 20 },
  name: { type: String, maxlength: 50, unique: true, required: true },
  doc_type: { type: String, maxlength: 20 },
  doc_num: { type: String, maxlength: 20 },
  direction: { type: String, maxlength: 70 },
  tell: { type: String, maxlength: 20 },
  email: { type: String, maxlength: 50, unique: true },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

const Persona = mongoose.model('persona', personSchema);
module.exports = Persona;
