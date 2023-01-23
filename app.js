import express from "express";
import dotenv from "dotenv";
import { getAccessToken } from "./public/script.js";

const app = express();
const port = 3000;

dotenv.config();
let accessToken = getAccessToken(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.GRANT_TYPE
);
console.log(process.env.CLIENT_ID);

app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log("Getting index.html");
  res.send("./index.html");
});

app.get("/api/realmList", (req, res) => {
  // TODO: add realm list code.
});

app.listen(port, () => {
  console.log(`Wow-auction app listening on port ${port}`);
});
