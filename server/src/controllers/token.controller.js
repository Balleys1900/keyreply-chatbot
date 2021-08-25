const Token = require('../models/token');
const shortId = require('shortid');
const chatbot = require('../data/chatbot.json');

class TokenController{

    creteSession(req,res,next){
        const client = {
            client_id : shortId.generate(),
            sessionid : shortId.generate(),
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
        return res.status(200).json({status: 'success'});
    }

    getNode(req,res,next){
        Token.findOne({client_id: req.body.client_id,sessionId: req.body.sessionid})
            .then((user) => {
                    if(user){
                        const currentNode = req.body.currentNode;
                        let contentNext;
                        let nextNode;

                        if(!currentNode.event){
                            contentNext = chatbot.content['conversation_start'];
                            return res.status(200).json({data: contentNext});
                        }

                        if(currentNode.event === 'capture'){
                            nextNode = currentNode.data.next.data;
                            contentNext = chatbot.content[nextNode];
                            if(contentNext.condition.property === currentNode.data.key
                                && contentNext.condition.value === currentNode.data.value){
                                return res.status(200).json({data: contentNext});
                            }
                            return res.status(404).json({msg:'error condition'});
                        }

                        if(currentNode.event === 'goto'){
                            nextNode = currentNode.data;
                            contentNext = chatbot.content[nextNode];
                            return res.status(200).json({data: contentNext});
                        }
                    }
                return res.status(404).json({msg:'not found user'});
                }
            )
            .catch(next)
    }
}

module.exports = new TokenController;