const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const routes = require("./routes");
var bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(routes);
app.use(bodyParser.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
