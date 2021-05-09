const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expertSchema = new Schema({
  username: String,
  email: String,
  phone: Number,
});

module.exports = mongoose.model("Expert", expertSchema);
