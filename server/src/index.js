const express = require('express');
const app = express();
const port = 8000;
const route = require('./routes');
const session = require('express-session');
const MonggoDBSession = require('connect-mongodb-session')(session);
const cors = require('cors');
// const sessionMiddleware = require('./middlewares/session.middleware');
const db = require('./config/db');

const store = new MonggoDBSession({
	uri: 'mongodb+srv://team:vSEinrwcXSAwDoOi@cluster0.okfgn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
	collection: 'mySession',
});

db.connect();
app.use(express.json());
app.use(cors());
app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: false,
		store: store,
	}),
);

route(app);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
