const chatbot = require('../data/chatbot.json');
const User = require('../models/user');

class ChatbotController {
  navigateNode(req, res) {
    const currentNode = req.body.currentNode;
    if (!currentNode) {
      const contentNext = chatbot.content['conversation_welcome'];
      return res.status(200).json({ data: contentNext });
    }
    let nextNode = currentNode.event === 'capture' ? currentNode.data.next.data : currentNode.data;
    let contentNext = chatbot.content[nextNode];
    if (!contentNext)
      return res.status(404).json({ status: 'failed', message: 'resource not found' });
    return res.status(200).json({ data: contentNext });
  }

  async storeHistory(req, res) {
    const access_token = req.headers.authorization.split(' ')[1];
    const filter = { access_token: access_token };
    const update = { $set: { chatArr: req.body.chatArr } };
    User.updateOne(filter, update, { upsert: true })
      .then(() => {
        return res.status(200).json({ msg: 'update success' });
      })
      .catch(err => {
        return res.status(503).json({ msg: 'Internal server error' });
      });
  }

  getHistory(req, res) {
    const access_token = req.headers.authorization.split(' ')[1];
    User.findOne({ access_token: access_token })
      .then(data => {
        return res.status(200).send(data.chatArr);
      })
      .catch(err => {
        return res.status(404).json({ msg: 'chat Arr empty' });
      });
  }
}

module.exports = new ChatbotController();
