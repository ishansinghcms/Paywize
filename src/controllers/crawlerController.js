const Content = require("../models/content");
const { fetchHTML, extractContent } = require("../utils/htmlUtils");
const { URLS } = require("../constants");

exports.getCrawlerData = async (req, res, next) => {
  try {
    const websiteNumber = +req.body.websiteNumber;
    const existingContent = await Content.findOne({
      websiteNumber: websiteNumber,
    });
    if (existingContent)
      return res.status(200).json({ message: "Website already crawled." });
    const html = await fetchHTML(URLS[websiteNumber]);
    const text = extractContent(html, websiteNumber);
    const content = new Content({
      url: URLS[websiteNumber],
      content: text,
      websiteNumber: websiteNumber,
    });
    await content.save();
    return res
      .status(200)
      .json({ message: "Crawling and saving data successful." });
  } catch (error) {
    console.error("Error during crawling:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
