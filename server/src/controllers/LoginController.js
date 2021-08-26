const jwt = require("jsonwebtoken");

class LoginController {
  login(req, res) {
    const username = req.body.username;

    if (!username) {
      return res.status(400).json({
        status: "fail",
        message: "Bad Request",
      });
    }
    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    const tokens = jwt.sign({ username }, secretKey, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });
    return res.status(200).json(tokens);
  }
}

module.exports = new LoginController();
