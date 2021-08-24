const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/token.controller');
router.get('/cookie/ok',tokenController.signCookie);
router.get('/:name',tokenController.index);


module.exports = router;