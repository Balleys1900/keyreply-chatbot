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
router.get('/createSession',tokenController.creteSession);
router.get('/dashboard',isAuth,tokenController.dashboard);
router.get('/getNode/:content',isAuth,tokenController.getNode);


module.exports = router;