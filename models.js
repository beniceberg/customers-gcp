const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Customer = new Schema({
  name: String,
  age: Number,
  email: String,
  address: String,
  dateOfBirth: Date
});

module.exports = mongoose.model("Customer", Customer);
