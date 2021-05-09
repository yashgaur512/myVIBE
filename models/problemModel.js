const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemSchema = new Schema({
  username: String,
  email: String,
  problemDescription: String,
});

module.exports = mongoose.model("Problem", problemSchema);
