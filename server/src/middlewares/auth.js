const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, secretKey); // => decode
    req.user = decoded;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

const checkTokenToLogin = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, secretKey);
    return res.status(200).json({
      username: decoded.username,
    });
  } catch (error) {
    return res.status(403).json({
      status: 'fail',
      message: 'token expired',
    });
  }
};

module.exports = { verifyToken, checkTokenToLogin };
