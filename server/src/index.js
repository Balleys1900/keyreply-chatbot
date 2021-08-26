const express = require("express");
const app = express();
const port = 8000;
const route = require("./routes");
const cors = require("cors");
const db = require("./config/db");
const dotenv = require('dotenv');
dotenv.config();

db.connect();
app.use(express.json());
app.use(cors());
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
