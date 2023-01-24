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
  /*
  When this endpoint gets a request it: 
  - Checks if there is a valid access token
  - If !accesstoken, get an accesstoken
  - send get request for all realms to Blizzard API
  - return data to user 
  */
  let accessToken = "";
  const hostName = "us.api.blizzard.com";
  const namespace = "namespace=dynamic-us&locale=en_US";
  const params = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: process.env.GRANT_TYPE,
  };

  const options = {
    method: "POST",
  };

  fetch(
    `https://oauth.battle.net/token?client_id=${params.client_id}&client_secret=${params.client_secret}&grant_type=${params.grant_type}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      accessToken = data.access_token;
      console.log(accessToken);
    })
    .then(() =>
      fetch(
        `https://${hostName}/data/wow/connected-realm/index?${namespace}&access_token=${accessToken}`
      )
    )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });

  console.log("Getting realm list...");
  res.redirect("/index.html");

  // console.log(`Access token sent: ${accessToken}`);
  // getConnectedRealms(accessToken);
});

app.listen(port, () => {
  console.log(`\n\nWow-auction app listening on port ${port}\n`);
});
