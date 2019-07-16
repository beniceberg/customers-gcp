"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");

require("./db");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("", routes);

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
