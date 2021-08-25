const express = require('express');
const app = express();
const port = 8000;
const route = require('./routes');
const session = require('express-session');
const cors = require('cors');
const db = require('./config/db');

db.connect();
app.use(express.json());
app.use(cors());
route(app);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
