const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/token.controller');
const isAuth = (req,res,next) =>{
    if(req.session.isAuth){
        next()
    } else {
        res.status(404).send('Not found');
    }

}
router.post('/webchat_new_session',tokenController.creteSession);
router.get('/dashboard',tokenController.dashboard);
router.post('/webchat',tokenController.getNode);


module.exports = router;