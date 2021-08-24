const express = require('express');
const app = express();
const port = 8000;
const route = require('./routes');
const db = require('./config/db')
const cookieParser = require('cookie-parser')

const sessionMiddleware = require('./middlewares/session.middleware');

//connect db
db.connect();
app.use(express.json());
app.use(cookieParser('secret'))
app.use(sessionMiddleware);
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})