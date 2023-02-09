import { auctionSampleData } from "./auctionSampleData.js";
import { getItemById, getItemMedia } from "./script.js";

// TODO: Old results are coming in during search. Need to check if new search has come in.

let searchTerm = "";

const auctionSearch = document.querySelector(".auctionSearch");

auctionSearch.addEventListener("keyup", (e) => {
  searchTerm = e.target.value.toLowerCase().trim();

  clearSearch();
  executeSearch(searchTerm);
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

export { auctionSearch };
