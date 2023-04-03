const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.get("/", (req, res) => {
  res.json("Welcome to the Tech News API");
});

app.get("/news", (req, res) => {
  const bbcUrl = "www.bbc.com";
  const topic = "/news/technology";
  axios.get("https://" + bbcUrl + topic).then((response) => {
    const $ = cheerio.load(response.data);
    const news = [];
    $(".gs-c-promo-body").each((i, el) => {
      if ($(el).find("time").attr("datetime")) {
        news.push({
          source: bbcUrl,
          title: $(el).find("h3").text(),
          link: $(el).find("a").attr("href"),
          datetime: $(el).find("time").attr("datetime"),
        });
      }
    });
    res.json(news);
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
