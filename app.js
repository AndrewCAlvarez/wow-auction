import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import url from "url";
import {
  getRealmIndex,
  getCommodities,
  getAuctions,
  getRealmListData,
} from "./public/blizzardAPIRequest.js";

const app = express();
const port = 3000;
app.use(cors());
dotenv.config();
let accessToken = "";
const params = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  grant_type: process.env.GRANT_TYPE,
};
app.use(express.static("public"));

app.get("/", (req, res) => {
  // console.log("Getting index.html");
  // res.send("./index.html");
});

app.get("/api/realm-index", (req, res) => {
  getRealmIndex(params.client_id, params.client_secret, params.grant_type).then(
    (data) => {
      console.log(data);
      res.send(data);
    }
  );
});

app.get("/api/commodities", (req, res) => {
  getCommodities(
    params.client_id,
    params.client_secret,
    params.grant_type
  ).then((data) => {
    res.send(data);
  });
});

app.get("/api/auctions", (req, res) => {
  console.log(req.query.realmid);
  getAuctions(
    params.client_id,
    params.client_secret,
    params.grant_type,
    req.query.realmid
  ).then((data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`\n\nWow-auction app listening on port ${port}\n`);
});
