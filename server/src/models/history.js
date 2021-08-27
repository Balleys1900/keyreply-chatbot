const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const History = new Schema({
    "chatArr":[],
    "tokens":{"type": String}
});

module.exports = mongoose.model('History',History);