const constant = require("../config");

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
    const secretKey = constant.ACCESS_TOKEN_SECRET;
    const tokens = jwt.sign({ username }, secretKey, {
      expiresIn: "24h",
    });
    return res.status(200).json(tokens);
  }
}

module.exports = new LoginController();
