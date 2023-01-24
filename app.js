import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  getAccessToken,
  getConnectedRealms,
} from "./public/blizzardAPIRequest.js";

const app = express();
const port = 3000;
app.use(cors());
dotenv.config();
let accessToken = "";

app.use(express.static("public"));

app.get("/", (req, res) => {
  // console.log("Getting index.html");
  // res.send("./index.html");
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
  let realmIDs = [];
  let realms = [];
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
      data.connected_realms.forEach((realmhref) => {
        realmIDs.push(
          realmhref.href
            .replace(
              "https://us.api.blizzard.com/data/wow/connected-realm/",
              ""
            )
            .replace("?namespace=dynamic-us", "")
        );
      });
      console.log(realmIDs);
      res.json(data);
    })
    .then(() => {
      // Fetch individual realm info and push to realms array.
      realmIDs.forEach((realmID) => {
        fetch(
          `https://${hostName}/data/wow/connected-realm/${realmID}?${namespace}&access_token=${accessToken}`
        ).then((response) => response.json());
        // .then((data) => realms.push(data));
      });
      // res.json(realms);
    });

  console.log("Getting realm list...");
});

app.listen(port, () => {
  console.log(`\n\nWow-auction app listening on port ${port}\n`);
});
