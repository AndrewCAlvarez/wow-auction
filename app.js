import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import url from "url";
import {
  getAccessToken,
  getToken,
  getCommodities,
  getItemById,
  getItemMedia,
  getMiningAuctions,
} from "./blizzardAPIRequest.js";

const app = express();
const port = 3000;
app.use(cors());
dotenv.config();
const params = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  grant_type: process.env.GRANT_TYPE,
};

let accessToken = await getAccessToken(
  params.client_id,
  params.client_secret,
  params.grant_type
);

app.use(express.static("public"));

// Unnecessary
app.get("/api/realm-index", (req, res) => {
  getRealmIndex(params.client_id, params.client_secret, params.grant_type).then(
    (data) => {
      console.log(data);
      res.send(data);
    }
  );
});

// Unnecessary
app.get("/api/connected-realm/index", (req, res) => {
  createConnectedRealmArray(
    params.client_id,
    params.client_secret,
    params.grant_type
  ).then((data) => {
    res.json(data);
  });
});

app.get("/api/commodities", (req, res) => {
  getCommodities(accessToken.access_token).then((data) => {
    res.json(data);
  });
});

app.get("/api/auctions/profession/mining", (req, res) => {
  getMiningAuctions(accessToken.access_token).then((data) => {
    res.json(data);
  });
});

// Future feature
app.get("/api/auctions", (req, res) => {
  // console.log(req.query.realmid);
  getAuctions(
    params.client_id,
    params.client_secret,
    params.grant_type,
    req.query.realmid
  ).then((data) => {
    res.json(data);
  });
});

app.get("/api/item", (req, res) => {
  getItemById(accessToken.access_token, req.query.itemid).then((data) =>
    res.json(data)
  );
});

app.get("/api/data/media/item", (req, res) => {
  getItemMedia(accessToken.access_token, req.query.itemid).then((data) =>
    res.json(data)
  );
});

app.get("/api/token", (req, res) => {
  // This gets a World of Warcraft token which is NOT the same as the access token. A WoW token is a type of currency.
  getToken(accessToken.access_token).then((token) => {
    res.json(token);
  });
});

// Future feature
app.get("/api/search", (req, res) => {
  console.log("Search request: " + req.query.name);
  searchItemByName(
    params.client_id,
    params.client_secret,
    params.grant_type,
    req.query.name
  ).then((data) => res.json(data));
});

app.listen(port, () => {
  console.log(`\n\nWow-auction app listening on port ${port}\n`);
});
