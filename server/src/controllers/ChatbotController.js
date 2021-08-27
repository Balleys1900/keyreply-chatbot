const chatbot = require("../data/chatbot.json");
const Element = require("../models/history");
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

  async storeHistory(req,res){
    const access_token = req.headers.authorization.split(' ')[1];
    const filter = { tokens: access_token }
    const update = { $set: { chatArr: req.body.chatArr,tokens: access_token }}
    Element.findOne(filter)
        .then((data) =>{
          if(data){
            Element.updateOne(filter, update, { upsert: true })
                .then(()=>{
                  return res.status(200).json({msg: "update success"});
                })
                .catch(err=>{
                  return res.status(503).json({msg: "Internal server error"});
                })
          }else {
            Element.create({
              chatArr: req.body.chatArr,
              tokens: req.headers.authorization.split(' ')[1]
            })
            return res.status(200).json({msg: "create success"});
          }
        })
  }

  getHistory(req,res){
    const access_token = req.headers.authorization.split(' ')[1];
    Element.findOne({tokens:access_token})
        .then((data) => {
          return res.status(200).send(data.chatArr);
        })
        .catch((err) => {
          return res.status(404).json({msg: 'user not found'});
        });
  }
}

module.exports = new ChatbotController();
