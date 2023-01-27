async function getRealmIndex() {
  const url = "http://127.0.0.1:3000/api/realm-index";
  await fetch(url)
    .then((response) => response.json())
    .then((realmIndex) => {
      console.log(realmIndex);
      realmIndex.realms.forEach((realm) => {
        console.log(realm.name);
      });
    });
}

async function getCommodities() {
  const url = "http://127.0.0.1:3000/api/commodities";
  await fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

async function getAuctions() {
  const url = "http://127.0.0.1:3000/api/auctions?realmid=54";
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      console.log(data.auctions[0]);
      createElementAuctionListing(data.auctions[0]);
    });
}

async function getItemById(itemId) {
  console.log(itemId);
  let itemData;
  const url = `http://127.0.0.1:3000/api/item?itemid=${itemId}`;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      itemData = data;
    });

  return itemData;
}

// Creates HTML elements for a single auction listing.
async function createElementAuctionListing(auction) {
  let container = document.querySelector(".response");
  let listingContainer = document.createElement("div");
  listingContainer.className = "listing-container";

  for (const property in auction) {
    if (property == "id" || property == "item") continue;
    let listTitle = document.createElement("h4");
    let listData = document.createElement("p");
    listTitle.textContent = property;
    listData.textContent = auction[property];
    listingContainer.appendChild(listTitle);
    listingContainer.appendChild(listData);
    // console.log(listItem);
  }

  let item = await getItemById(auction.item.id);
  for (property in item) {
    if (property == "name" || property == "quality" || property == "level") {
      let itemTitle = document.createElement("h4");
      let itemData = document.createElement("p");
      itemTitle.textContent = property;
      itemData.textContent = item[property];
      listingContainer.appendChild(itemTitle);
      listingContainer.appendChild(itemData);
    }
  }

  container.appendChild(listingContainer);
}
