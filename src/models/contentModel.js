const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema({
  url: String,
  content: String,
  websiteNumber: Number,
});

const Content = mongoose.model("Content", contentSchema);
module.exports = Content;
