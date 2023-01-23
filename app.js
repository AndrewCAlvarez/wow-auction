import express from "express";
import dotenv from "dotenv";
import { getAccessToken } from "./public/script.js";

const app = express();
const port = 3000;

console.log(process.env.CLIENT_ID);

app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log("Getting index.html");
  res.send("./index.html");
});

app.get("/api", (req, res) => {
  console.log("Get /api");
  getAccessToken(
    "701a8a5976ab4346ba5c4b151ca76132",
    "MAh3G6I93NogGlz3Kwy8jbdknDJklagd",
    "client_credentials"
  );
});

app.listen(port, () => {
  console.log(`Wow-auction app listening on port ${port}`);
});
