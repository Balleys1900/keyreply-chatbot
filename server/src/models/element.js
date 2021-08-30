const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Element = new Schema({
  chatArr: [],
  tokens: { type: String },
});

module.exports = mongoose.model('Element', Element);
