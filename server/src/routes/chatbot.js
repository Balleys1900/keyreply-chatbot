const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/ChatbotController");

router.post("/", chatbotController.navigateNode);

module.exports = router;
