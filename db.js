const mongoose = require("mongoose");
require("dotenv").config();

const mongodbUri = `mongodb+srv://${process.env.DB_USERNAME}:${
  process.env.DB_PASSWORD
}@clustercustomers-d3x22.gcp.mongodb.net/test?retryWrites=true&w=majority/ikea-gcp-db`;

mongoose
  .connect(mongodbUri, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to ikea-gcp-db");
  })
  .catch(err => {
    console.log("Connection error", err);
  });
