const tokenRouter = require('./token');
function route(app){
    app.use('/api/token',tokenRouter);
}

module.exports = route;