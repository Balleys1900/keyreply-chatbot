const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
    text: {type:String},
    thumb: {type:String},
    price: {type:String},
    sub_text: {type:String},
    value:{type:String},
    lang:{type:String},
    buttons : []
});

module.exports = mongoose.model('Item', Item);
