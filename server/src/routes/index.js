const tokenRouter = require('./token');
function route(app){
    app.use('/token',tokenRouter);
}

module.exports = route;