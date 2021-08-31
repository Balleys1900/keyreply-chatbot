const chatbotRouter = require('./chatbot');
const loginRouter = require('./login');
const { verifyToken, checkTokenToLogin } = require('../middlewares/auth');
function route(app) {
  app.use('/api/v1/login', checkTokenToLogin, loginRouter);
  app.use('/api/v1/chatbot', verifyToken, chatbotRouter);
}

module.exports = route;
