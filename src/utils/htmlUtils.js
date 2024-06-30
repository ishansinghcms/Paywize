const axios = require("axios");
const cheerio = require("cheerio");

//returns the html content
async function fetchHTML(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching HTML:", error);
    return null;
  }
}

function extractContent(html, websiteNumber) {
  let $ = cheerio.load(html);
  $("style").remove();
  $("script").remove();
  $("[style]").removeAttr("style");
  let content = "";
  //selecting specific html elements using css selectors for wikipedia pages
  const elementsArray = $("div.mw-content-ltr p");
  for (element of elementsArray) {
    // excluding CSS and whitespace characters
    content += $(element).text().trim();
  }
  // removing [number] patterns
  content = content.replace(/\[\d+\]/g, "");
  // removing extra whitespace and newlines
  content = content.replace(/\s+/g, " ").trim();
  console.log(content);
  return content;
}

module.exports = {
  fetchHTML,
  extractContent,
};
