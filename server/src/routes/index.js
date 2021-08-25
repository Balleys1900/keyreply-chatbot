// const tokenRouter = require('./token');
const chatbotRouter = require("./chatbot");
function route(app) {
  // app.use('/api/v1/token',tokenRouter);
  app.use("/api/v1/chatbot", chatbotRouter);
}

module.exports = route;
