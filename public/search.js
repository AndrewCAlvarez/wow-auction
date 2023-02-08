import { auctionSampleData } from "./auctionSampleData.js";
import { getItemById, getItemMedia } from "./script.js";

const auctionSearch = document.querySelector(".auctionSearch");
auctionSearch.addEventListener("keyup", (e) => {
  let currentValue = e.target.value.toLowerCase();
  // auctionSampleData.auctions.forEach((auction) => {
  //   console.log(getItemById(auction.item.id));
  // });
  if (currentValue === "") {
  } else {
    const url = "http://127.0.0.1:3000/api/search";
    fetch(url + `?name=${currentValue}`)
      .then((response) => response.json())
      .then((searchResults) => {
        console.log(searchResults.results);
        clearSearch();
        searchResults.results.forEach((item) => {
          populateSearch(item.data.id);
        });
      });
  }
});

async function populateSearch(itemId) {
  let item;
  let itemMedia;
  let searchResultContainer = document.querySelector(".searchResultContainer");
  await getItemById(itemId).then((item) => {
    item = item;
    getItemMedia(itemId)
      .then((itemMedia) => {
        itemMedia = itemMedia;
      })
      .then(() => {
        console.log(item.name);
        let searchResult = document.createElement("p");
        searchResult.className = "searchResult";
        searchResult.textContent = item.name;
        searchResultContainer.appendChild(searchResult);
      });
  });
}

function clearSearch() {
  let searchResults = document.querySelectorAll(".searchResult");
  console.log(searchResults);
  searchResults.forEach((searchResult) => {
    if (searchResult.parentNode) {
      searchResult.parentNode.removeChild(searchResult);
    }
  });
}

export { auctionSearch };
