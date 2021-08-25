const Token = require('../models/token');
const shortId = require('shortid');
const chatbot = require('../data/chatbot.json');
const items = require('../data/item.json');

class TokenController {
	creteSession(req, res, next) {
		const client = {
			client_id: shortId.generate(),
			sessionid: shortId.generate(),
		};
		const token = Token.create({
			name: req.body.name,
			client_id: client.client_id,
			price: '600$',
			sessionId: client.sessionid,
		});
		res.status(200).send(client);
	}

	dashboard(req, res) {
		res.send('dashboard');
	}

	getNode(req, res, next) {
		Token.findOne({ client_id: req.body.client_id, sessionId: req.body.sessionid })
			.then((user) => {
				if (user) {
					const currentNode = req.body.currentNode;
					let content;
					if (currentNode === 'list_items') {
						content = items.content[currentNode];
					} else {
						content = chatbot.content[currentNode];
						// res.send(content);
					}
					// res.send(content);
					res.status(200).json({ data: content });
				}
				res.statusCode = 404;
			})
			.catch(next);
	}
}

module.exports = new TokenController();
