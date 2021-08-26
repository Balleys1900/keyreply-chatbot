const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/ChatbotController");

router.post("/store",chatbotController.storeHistory);
router.get("/history",chatbotController.getHistory);

router.post("/", chatbotController.navigateNode);




module.exports = router;
