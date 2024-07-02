const Chat = require("../models/chat");
const User = require("../models/user");

exports.getAnalytics = async (req, res, next) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email });
    const userChats = await Chat.find({ user: user._id }); //length
    const totalChats = await Chat.countDocuments();
    const userWebInteractions = {
      website0: 0,
      website1: 0,
      website2: 0,
      website3: 0,
      website4: 0,
    };
    const allUsersWebInteractions = {
      website0: 0,
      website1: 0,
      website2: 0,
      website3: 0,
      website4: 0,
    };
    const allChats = await Chat.find();
    for (const chat of allChats) {
      allUsersWebInteractions[`website${chat.website}`] += 1;
    }
    for (const chat of userChats) {
      userWebInteractions[`website${chat.website}`] += 1;
    }
    const jsonResponse = {
      userQuestionCount: userChats.length,
      allUserQuestionCount: totalChats,
      userWebsiteInteraction: userWebInteractions,
      allUsersWebInteractions: allUsersWebInteractions,
    };
    res.status(200).json(jsonResponse);
  } catch (error) {
    console.error("Error during getting analytics data:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
