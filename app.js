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
  getAccessToken();
});

app.listen(port, () => {
  console.log(`Wow-auction app listening on port ${port}`);
});
