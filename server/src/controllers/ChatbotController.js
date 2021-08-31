const chatbot = require('../data/chatbot.json');
const User = require('../models/user');
const storage = require('node-sessionstorage');
const fuzz = require('fuzzball');

class ChatbotController {
  startHandler(req, res) {
    res.status(200).json({
      status: true,
      content: chatbot.content['conversation_start'],
    });
  }

  navigateNode(req, res) {
    const id = req.user.id;
    const userStatus = storage.getItem(id);
    if (!userStatus.isNextNodeHaveCondition) {
      res.status(200).json({
        content: chatbot.content[userStatus.next],
      });
    } else {
      let matchNode;
      const data = chatbot.content;
      for (const node in data) {
        let temp = true;
        if (data[node].id === userStatus.next) {
          const condition = data[node].condition;
          condition.forEach(cond => {
            if (userStatus[cond.property] !== cond.value) {
              temp = false; //false
            }
          });
          if (temp) matchNode = data[node];
        }
      }
      res.status(200).json({
        content: matchNode,
      });
    }
  }

  async storeHistory(req, res) {
    const filter = { _id: req.user.id };
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
    User.findOne({ _id: req.user.id })
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
    const store = storage.getItem(req.user.id);
    const language_select = store?.language_select || 'vi';

    const prefix = language_select === 'vi' ? ':vi' : '';

    console.log({ prefix });
    let matchNode;

    for (const property in chatbot.content) {
      if (!property.includes('not_found')) {
        nodeRegArr.push({ id: property, regex: chatbot.content[property].regex });
      }
    }

    const matchItem = nodeRegArr.find(item => {
      const pattern = new RegExp(item.regex, 'g');
      return pattern.test(commandString);
    });

    if (matchItem) {
      matchNode = chatbot.content[matchItem.id];
    } else {
      const matchNodesRaw = fuzz.extract(commandString, nodeRegArr, {
        returnObjects: true,
        processor: choice => choice.id,
      });
      if (matchNodesRaw[0].score > 30) {
        matchNode = chatbot.content[matchNodesRaw[0].choice.id];
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
        content: chatbot.content[`not_found${prefix}`],
      });
    }
  }
}

module.exports = new ChatbotController();
