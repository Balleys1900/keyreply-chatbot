const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const route = require("./routes");
const cors = require("cors");

app.use(express.json());
app.use(cors());
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
