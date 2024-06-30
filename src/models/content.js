const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema({
  url: { type: String, required: true },
  content: { type: String, required: true },
  websiteNumber: { type: Number, required: true },
});

const Content = mongoose.model("Content", contentSchema);
module.exports = Content;
