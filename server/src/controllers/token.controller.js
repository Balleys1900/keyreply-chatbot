const Token = require('../models/token');
const shortId = require('shortid');
const data = require('../data/bot.json')

class TokenController{

    creteSession(req,res,next){
        req.session.isAuth = true ;
        res.status(200).send('created');
    }

    dashboard(req,res){
        res.send("dashboard");
    }

    getNode(req,res){
        const currentNode = req.params.content;
        const content = data.content[currentNode];
        res.status(200).json(content);

    }
}

module.exports = new TokenController;