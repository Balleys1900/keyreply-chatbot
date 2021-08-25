const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Token = new Schema({
    name:{type:String},
    client_id:{type:String},
    price: {type:String},
    sessionId:{type:String},
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Token',Token);