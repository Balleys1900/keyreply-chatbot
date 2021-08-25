const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/token.controller');

router.post('/webchat_new_session',tokenController.creteSession);
router.get('/dashboard',tokenController.dashboard);
router.post('/webchat',tokenController.getNode);
// router.post('/test',tokenController.test);


module.exports = router;