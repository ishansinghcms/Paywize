const Content = require("../models/content");
const { HfInference } = require("@huggingface/inference");
const hf = new HfInference(process.env.ACCESS_TOKEN);

exports.getAnswer = async (req, res, next) => {
  try {
    const question = req.body.question;
    const websiteNumber = req.body.websiteNumber;
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
      .then((answerObject) =>
        res
          .status(200)
          .json({ answer: answerObject.answer, accuracy: answerObject.score })
      );
  } catch (error) {
    console.error("Error during getting answer:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
