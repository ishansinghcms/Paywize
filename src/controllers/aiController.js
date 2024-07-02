const Content = require("../models/content");
const Chat = require("../models/chat");
const User = require("../models/user");
const { HfInference } = require("@huggingface/inference");
const { URLS, LABELS } = require("../constants");
const hf = new HfInference(process.env.ACCESS_TOKEN);

exports.postQuestion = async (req, res, next) => {
  try {
    const question = req.body.question;
    const websiteNumber = req.body.websiteNumber;
    const email = req.body.email;
    const websiteObject = await Content.findOne({
      websiteNumber: websiteNumber,
    });
    if (!websiteObject)
      return res.status(500).json({ error: "Website content not found." });
    const content = websiteObject.content;

    await hf
      .questionAnswering({
        model: "deepset/roberta-base-squad2",
        inputs: {
          question: question,
          context: content,
        },
      })
      .then(async (answerObject) => {
        const user = await User.findOne({ email: email });
        const chat = new Chat({
          question: question,
          answer: answerObject.answer,
          accuracy: answerObject.score,
          user: user._id,
          website: websiteNumber,
        });
        await chat.save();
        return res
          .status(200)
          .json({ answer: answerObject.answer, accuracy: answerObject.score });
      });
  } catch (error) {
    console.error("Error during getting answer:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

exports.getChats = async (req, res, next) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email: email });
    const chats = await Chat.find({ user: user._id });
    return res.status(200).json(chats);
  } catch (error) {
    console.error("Error during retrieving chats:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

exports.getWebsites = async (req, res, next) => {
  const websites = URLS.map((url, index) => {
    return { url: url, value: index, label: LABELS[index] };
  });
  res.status(200).json(websites);
};
