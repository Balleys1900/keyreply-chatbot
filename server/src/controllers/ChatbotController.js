const chatbot = require("../data/chatbot.json");
const Element = require("../models/element");
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

  storeHistory(req, res) {
    const data = Element.create({
      chatArr: req.body.chatArr,
      tokens: req.headers.authorization.split(" ")[1],
    });
    return res.status(200).json({ msg: "success" });
  }

  getHistory(req, res) {
    const access_token = req.headers.authorization.split(" ")[1];
    Element.findOne({ tokens: access_token })
      .then((data) => {
        return res.status(200).send(data.chatArr);
      })
      .catch((err) => {
        return res.status(404).json({ msg: "chat Arr empty" });
      });
  }
}

module.exports = new ChatbotController();
