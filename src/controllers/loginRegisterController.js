const User = require("../models/user");

exports.postLoginSignup = async (req, res, next) => {
  try {
    const email = req.body.email;
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(200)
        .json({ message: "already registered logging you in." });
    const newUser = new User({ email: email });
    await newUser.save();
    return res.status(200).json({ message: "registration successful." });
  } catch (error) {
    console.error("Error during login/register:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
