const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/ChatbotController");

router.get("/history",chatbotController.getHistory);
router.post("/history",chatbotController.storeHistory);
router.post("/", chatbotController.navigateNode);




module.exports = router;
