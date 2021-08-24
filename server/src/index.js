const express = require('express');
const app = express();
const port = 8000;
const route = require('./routes');
// const db = require('./config/db')
// const cookieParser = require('cookie-parser')
const session = require('express-session');
const MonggoDBSession = require('connect-mongodb-session')(session);

const sessionMiddleware = require('./middlewares/session.middleware');

const store = new MonggoDBSession({
    uri:'mongodb+srv://team:vSEinrwcXSAwDoOi@cluster0.okfgn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    collection:'mySession'
})
//connect db
// db.connect();
app.use(express.json());
// app.use(cookieParser('secret'))
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized: false,
    store: store,
}))
// app.use(sessionMiddleware);
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})