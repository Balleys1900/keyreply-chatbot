const chatbot = require('../data/chatbot.json');
const User = require('../models/user');
const fuzz = require('fuzzball');

class ChatbotController {
  // lang : ....
  // currentItem : ....

  start(req, res) {
    res.status(200).json({
      status: true,
      content: {
        id: 'choose_language',
        text: 'Chọn ngôn ngữ',
        buttons: [
          {
            text: 'Vi',
          },
          {
            text: 'eng',
          },
        ],
      },
    });
  }

  navigateNode(req, res) {
    const { id } = req.user;
    const userStatus = sessionStorage.getItem(id);
    if (!userStatus.isNextNodeHaveCondition) {
      res.status(200).json({
        content: chatbot.content[userStatus.next],
      });
    } else {
    }
  }

  async storeHistory(req, res) {
    const filter = { id: req.user.id };
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
    User.findOne({ id: req.user.id })
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
      const pattern = new RegExp(item.regex, 'g');
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
