const shortId = require('shortid');
function getSession(req,res,next){
    if(!req.signedCookies.sessionId){
        res.cookie('sessionId',shortId.generate(),{ signed:true });
    }

    next();
}

module.exports = getSession;