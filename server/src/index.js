const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const db = require('./config/db');
const route = require('./routes');
const cors = require('cors');

db.connect();
app.use(express.json());
app.use(cors());
route(app);

app.listen(port, () => {
	console.log(`adsadasdads`);
});
