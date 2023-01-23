const express = require("express");
const dotenv = require("dotenv").config();
const wowAPI = require("./public/script");

const app = express();
const port = 3000;

console.log(process.env.CLIENT_ID);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("./index.html");
});

app.listen(port, () => {
  console.log(`Wow-auction app listening on port ${port}`);
});
