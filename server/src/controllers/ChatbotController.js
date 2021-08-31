const chatbot = require('../data/chatbot.json');
const User = require('../models/user');
const fuzz = require('fuzzball');
const { regexFromString } = require('../helper/reg');

class ChatbotController {
  navigateNode(req, res) {
    const currentNode = req.body.currentNode;
    if (!currentNode) {
      const contentNext = chatbot.content[req.user.language]['conversation_welcome'];
      return res.status(200).json({ data: contentNext });
    }
    let nextNode = currentNode.event === 'capture' ? currentNode.data.next.data : currentNode.data;
    let contentNext = chatbot.content[req.user.language][nextNode];
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

  /**
   * Get command from user chat and
   * return array of chat nodes that match the command
   */
  commandHandler(req, res) {
    const commandString = req.body.command.toLowerCase();
    const nodeRegArr = [];
    const lang = req.user.language;
    let matchNode;

    for (const property in chatbot.content[lang]) {
      if (property !== 'not_found') {
        nodeRegArr.push({ id: property, regex: chatbot.content[lang][property].regex });
      }
    }

    const matchItem = nodeRegArr.find(item => {
      const pattern = regexFromString(item.regex);
      return pattern.test(commandString);
    });

    if (matchItem) {
      matchNode = chatbot.content[lang][matchItem.id];
    } else {
      const matchNodesRaw = fuzz.extract(commandString, nodeRegArr, {
        returnObjects: true,
        processor: choice => choice.id,
      });
      if (matchNodesRaw[0].score > 30) {
        matchNode = chatbot.content[lang][matchNodesRaw[0].choice.id];
      }
    }

    if (matchNode) {
      res.status(200).send({
        status: true,
        content: matchNode,
      });
    } else {
      res.status(200).send({
        status: false,
        content: chatbot.content[lang]['not_found'],
      });
    }
  }
}

module.exports = new ChatbotController();
