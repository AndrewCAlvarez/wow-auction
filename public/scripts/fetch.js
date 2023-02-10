async function getCommodities() {
  const url = "http://127.0.0.1:3000/api/commodities";
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // console.log(data);
      // for (let index = 0; index < 100; index++) {
      //   generateAuctionTableListing(data.auctions[index]);
      // }
    });
}

async function getAuctions() {
  let realmId = document.querySelector(".realmIndexSelect").value;
  let auctionData;
  // console.log("Realm id selected: " + realmId);
  console.log("Getting Auctions...\n");
  const url = `http://127.0.0.1:3000/api/auctions?realmid=${realmId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      auctionData = data;

      for (let index = 0; index < 5; index++) {
        generateAuctionTableListing(data.auctions[index]);
      }
      data.auctions.forEach((auction) => {
        // NOTE: Doing this makes too many requests and takes forever to load.
        // generateAuctionTableListing(auction);
      });

      // console.log(data.auctions[0]);
      // createElementAuctionListing(data.auctions[0]);
    })
    .then(() => {
      console.log("getAuctions return value: ");
      console.log(auctionData);
      return auctionData;
    });

  // return auctionData;
}

async function getItemById(itemId) {
  let itemData;
  const url = `http://127.0.0.1:3000/api/item?itemid=${itemId}`;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      itemData = data;
    });

  return itemData;
}

async function getItemMedia(itemId) {
  const url = `http://127.0.0.1:3000/api/data/media/item?itemid=${itemId}`;
  let itemMedia;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Item media data: " + data);
      itemMedia = data;
    });

  return itemMedia;
}

// Creates HTML elements for a single auction listing.

export { getItemById, getItemMedia };
