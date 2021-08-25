const Token = require('../models/token');
const shortId = require('shortid');
const data = require('../data/chatbot.json')

class TokenController{

    creteSession(req,res,next){
        req.session.isAuth = true ;
        const client = {
            client_id : shortId.generate(),
            sessionid : req.sessionID,
        }
        const token = Token.create({
            name: req.body.name,
            client_id: client.client_id,
            price : '600$',
            sessionId: client.sessionid,
        })
        res.status(200).send(client);
    }

    dashboard(req,res){
        res.send("dashboard");
    }

    getNode(req,res){
        const currentNode = req.body.currentNode;
        const content = data.content[currentNode];
        res.status(200).json(content);

    }
}

module.exports = new TokenController;