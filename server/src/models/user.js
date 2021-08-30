const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String },
  access_token: { type: String },
  chatArr: [],
  lang: { type: string },
});

module.exports = mongoose.model('User', User);
