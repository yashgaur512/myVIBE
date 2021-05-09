const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expSchema = new Schema({
  username: String,
  email: String,
  phone: Number,
  title: String,
  experience: String,
});

module.exports = mongoose.model("Experience", expSchema);
