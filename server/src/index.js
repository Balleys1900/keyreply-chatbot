const express = require('express');
const app = express();
const port = 8000;
const route = require('./routes');
const session = require('express-session');
<<<<<<< HEAD
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

=======
const cors = require('cors')
const db = require('./config/db')

db.connect();
app.use(express.json());
app.use(cors());
>>>>>>> be5129424406fe64c0f8b284d687280d7fad1a51
route(app);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
