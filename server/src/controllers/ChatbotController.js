const shortId = require("shortid");
const chatbot = require("../data/chatbot.json");

class ChatbotController {
  navigateNode(req, res) {
    const currentNode = req.body.currentNode;
    if (!currentNode) {
      const contentNext = chatbot.content["conversation_welcome"];
      return res.status(200).json({ data: contentNext });
    }
    let nextNode =
      currentNode.event === "capture"
        ? currentNode.data.next.data
        : currentNode.data;
    let contentNext = chatbot.content[nextNode];
    if (!contentNext)
      return res
        .status(404)
        .json({ status: "failed", message: "resource not found" });
    return res.status(200).json({ data: contentNext });
  }
}

module.exports = new ChatbotController();
