const mongoose = require("mongoose");

const mongodbUri = `mongodb://localhost/ikea-gcp-db`;

mongoose
  .connect(mongodbUri, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to ikea-gcp-db");
  })
  .catch(err => {
    console.log("Connection error", err);
  });
