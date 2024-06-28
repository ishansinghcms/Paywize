const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const mongodbUrl = process.env.MONGODB_URL;
const crawlerRoutes = require("./routes/crawlerRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/crawler", crawlerRoutes);

mongoose
  .connect(mongodbUrl)
  .then(() => {
    console.log("Database connected successfully.");
    console.log(`Listening to Paywize API requests on port: ${port}.`);
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
