const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String },
  access_token: { type: String },
  chatArr: [],
});

module.exports = mongoose.model("User", User);
