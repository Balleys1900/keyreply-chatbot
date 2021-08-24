const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/bot_database_dev',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log('Connect database successfully!');
    }catch (e) {
        console.log('Connect database failure!')
    }
}

module.exports = {connect};