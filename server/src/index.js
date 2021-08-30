const express = require('express');
const cors = require('cors');
const route = require('./routes');

require('./config/db').connect();
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

route(app);

app.listen(port, () => {
  console.log(`http://localhost:${port}}`);
});
