import { auctionSampleData } from "./auctionSampleData.js";
import { commoditiesSampleData } from "./commoditiesSampleData.js";
import { getItemById, getItemMedia } from "./fetch.js";

// TODO: Old results are coming in during search. Need to check if new search has come in.

let searchTerm = "";

const auctionSearch = document.querySelector(".auctionSearch");

auctionSearch.addEventListener("keyup", (e) => {
  // searchTerm = e.target.value.toLowerCase().trim();
  // clearSearch();
  // setTimeout(() => {
  //   executeSearch(searchTerm);
  // }, 500);
});

const searchBtn = document.querySelector(".btn--search");
searchBtn.addEventListener("click", (e) => {
  searchTerm = auctionSearch.value;
  console.log(searchTerm);
  clearSearch();
  // executeSearch(searchTerm);
  searchAuctionLocalData(searchTerm);
});

async function executeSearch(searchTerm) {
  if (searchTerm.length === 0) {
    // Do nothing
  } else {
    let resultObj = await search(searchTerm);
    resultObj.data.results.forEach((item) => {
      populateSearch(item.data.id);
    });
  }
}

async function search(searchTerm) {
  const url = "http://127.0.0.1:3000/api/search" + `?name=${searchTerm}`;
  let searchObj = {};

  await fetch(url)
    .then((response) => response.json())
    .then((searchResults) => {
      searchObj.searchTerm = searchTerm;
      searchObj.data = searchResults;
    });

  return searchObj;
}

async function populateSearch(itemId) {
  let searchResultContainer = document.querySelector(".searchResultContainer");
  let item = await getItemById(itemId);

  if (!document.querySelector(`#item${itemId}`)) {
    let searchResult = document.createElement("a");
    let searchResultText = document.createElement("p");
    searchResult.className = "searchResult";
    searchResult.id = "item" + itemId;
    searchResult.setAttribute("href", "#");
    searchResultText.className = "searchResultText";
    searchResultText.textContent = item.name;

    searchResult.appendChild(searchResultText);
    searchResultContainer.appendChild(searchResult);
  }
}

function clearSearch() {
  let searchResults = document.querySelectorAll(".searchResult");
  searchResults.forEach((searchResult) => {
    if (searchResult.parentNode) {
      searchResult.parentNode.removeChild(searchResult);
    }
  });
}

async function searchAuctionLocalData(searchTerm) {
  console.log(`Sample data: `);
  console.log(auctionSampleData.auctions);
  let uniqueItems = [];
  let auctions = auctionSampleData.auctions;
  // await auctions.forEach((auction) => {
  //   if ((auction.item.id = 190320)) {
  //     console.log(auction.item.id);
  //   }
  // });
  populateSearch(190320);
  console.log("Finished scanning auctions.");
  console.log(
    `Total auctions: ${auctions.length} \n Total unique items: ${uniqueItems.length}`
  );
  console.log(auctions);
  console.log(uniqueItems);
}

async function searchCommodityLocalData(searchTerm) {
  console.log(`Sample data: `);
  console.log(commoditiesSampleData.auctions);
  let uniqueItems = [];
  let auctions = commoditiesSampleData.auctions;
  // await auctions.forEach((auction) => {
  //   if ((auction.item.id = 190320)) {
  //     console.log(auction.item.id);
  //   }
  // });
  populateSearch(190320);
  console.log("Finished scanning auctions.");
  console.log(
    `Total auctions: ${auctions.length} \n Total unique items: ${uniqueItems.length}`
  );
  console.log(auctions);
  console.log(uniqueItems);
}
export { searchAuctionLocalData, searchCommodityLocalData };
