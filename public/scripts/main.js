import { auctionSampleData } from "../auctionSampleData.js";
import { connectedRealmIndexSample } from "../connectedRealmIndexSample.js";
import { commoditiesSampleData } from "../commoditiesSampleData.js";
import { searchCommodityLocalData, searchAuctionLocalData } from "./search.js";

window.addEventListener("load", (event) => {
  getConnectedRealmIndex().then((connectedRealmList) => {
    // state.connectedRealmData = connectedRealmList;
    loadRealmSelectElement();
    document
      .querySelector(".btnLoadCommodities")
      .addEventListener("click", loadCommodities);
  });
});
