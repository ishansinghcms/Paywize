const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const Content = require("../models/contentModel");

exports.getCrawlerData = async (req, res, next) => {
  const url =
    "https://www.loc.gov/everyday-mysteries/astronomy/item/why-is-pluto-no-longer-a-planet/";

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    const content = await page.content();
    const $ = cheerio.load(content);

    function filterText(node) {
      return $(node)
        .contents()
        .map(function () {
          if (this.nodeType === 3) {
            return $(this).text();
          } else if (
            this.tagName &&
            (this.tagName === "style" || this.tagName === "script")
          ) {
            return "";
          } else {
            return filterText(this);
          }
        })
        .get()
        .join(" ")
        .trim();
    }
    const text = filterText("body");
    const images = [];
    $("img").each((index, element) => {
      //   const imageUrl = $(element).attr("src");
      const altText = $(element).attr("alt");
      const titleText = $(element).attr("title");
      const description = $(element).attr("data-description");
      let combinedImageText = "";
      if (altText) combinedImageText = altText;
      if (titleText) combinedImageText += titleText;
      if (description) combinedImageText += description;
      if (combinedImageText.length > 0) images.push(combinedImageText);
    });

    const links = [];
    $("a").each((i, elem) => {
      const link = $(elem).attr("href");
      if (link && link.startsWith("http")) {
        links.push(link);
      }
    });
    const contentData = new Content({
      url,
      text,
      images,
      links,
    });

    // await contentData.save();

    await browser.close();

    console.log(images);
    res.status(200).json({ message: "Crawling and saving data successful" });
  } catch (error) {
    console.error("Error during crawling:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
