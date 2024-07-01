const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  accuracy: { type: Number, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
