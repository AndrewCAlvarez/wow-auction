import express from "express";
import dotenv from "dotenv";
import {
  getAccessToken,
  getConnectedRealms,
} from "./public/blizzardAPIRequest.js";

const app = express();
const port = 3000;

dotenv.config();
let accessToken = "";

app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log("Getting index.html");
  res.send("./index.html");
});

app.get("/api/realm-list", (req, res) => {
  accessToken = getAccessToken(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.GRANT_TYPE
  );
  console.log(`Access token sent: ${accessToken}`);
  getConnectedRealms(accessToken);
});

app.listen(port, () => {
  console.log(`Wow-auction app listening on port ${port}`);
});
