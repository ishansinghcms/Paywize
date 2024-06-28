const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema({
  url: String,
  text: String,
  images: [String],
  links: [String],
});

const Content = mongoose.model("Content", contentSchema);
module.exports = Content;
