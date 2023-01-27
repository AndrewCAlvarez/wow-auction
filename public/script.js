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
  const url = `http://127.0.0.1:3000/api/item?itemid=${itemId}`;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(`${data.name}`));
}

async function createElementAuctionListing(auction) {
  let container = document.querySelector(".response");
  let item = await getItemById(auction.item.id);
  for (const property in auction) {
    if (property == "id" || property == "item") continue;
    let listTitle = document.createElement("h4");
    let listData = document.createElement("p");
    listTitle.textContent = property;
    listData.textContent = auction[property];
    container.appendChild(listTitle);
    container.appendChild(listData);
    // console.log(listItem);
  }
  let listing = document.createElement("p");
  listing.textContent = auction.id;
  document.body.appendChild(listing);
}
