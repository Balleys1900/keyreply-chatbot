const Token = require('../models/token')
class TokenController{
    index(req,res){
        const token = Token.create({
            name : req.params.name,
            price :'600$',
            sessionID : req.signedCookies.sessionId
        });
        res.send("saved");
    }

    signCookie(req,res){
        console.log(req.cookies);
        res.send("ok")
    }
}

module.exports = new TokenController;