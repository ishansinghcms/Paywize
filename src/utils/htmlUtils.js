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

function extractContent(html) {
  let $ = cheerio.load(html);
  $("style").remove();
  $("script").remove();
  $("[style]").removeAttr("style");
  let content = "";
  //selecting specific html elements using css selectors
  const elementsArray = $(
    ".main-section .layout-row:first-child .layout-column:first-child p, .main-section .layout-row:first-child .layout-column:first-child h3, .main-section .layout-row:first-child .layout-column:first-child li"
  );
  for (element of elementsArray) {
    // excluding CSS and whitespace characters
    content += $(element).text().trim() + " ";
  }
  return content;
}

module.exports = {
  fetchHTML,
  extractContent,
};
