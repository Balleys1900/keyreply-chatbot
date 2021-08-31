const jwt = require('jsonwebtoken');
const User = require('../models/user');

class LoginController {
  login(req, res) {
    const username = req.body.username;

    if (!username) {
      return res.status(400).json({
        status: 'fail',
        message: 'Bad Request',
      });
    }

    const secretKey = process.env.ACCESS_TOKEN_SECRET;

    User.create({
      username: req.body.username,
      chatArr: [],
    })
      .then(user => {
        const token = jwt.sign({ username, id: user._id }, secretKey, {
          expiresIn: process.env.ACCESS_TOKEN_LIFE,
        });

        return res.status(200).json(token);
      })
      .catch(err => {
        return res.status(503).json({ msg: "Can't create user" });
      });
  }
}

module.exports = new LoginController();
