function clearAuctionTable() {
  let auctionTable = document.querySelectorAll(".listingContainer");
  console.log(auctionTable);
  auctionTable.forEach((listing) => {
    if (listing.parentNode) {
      listing.parentNode.removeChild(listing);
    }
  });
}

async function generateAuctionTableListing(auction) {
  // auction = {
  //   id: 669294874,
  //   item: {
  //     id: 93551,
  //     bonus_lists: [7178],
  //     modifiers: [
  //       {
  //         type: 9,
  //         value: 35,
  //       },
  //       {
  //         type: 28,
  //         value: 860,
  //       },
  //     ],
  //   },
  //   buyout: 49990000,
  //   quantity: 1,
  //   time_left: "LONG",
  // };
  // console.log(await getItemById(auction.item.id));

  let itemData = await getItemById(auction.item.id);
  let itemMedia = await getItemMedia(auction.item.id);
  console.log(itemMedia);
  // console.log("auction id logged: " + auction.id);
  // console.log("itemData id logged: " + itemData.name);
  let auctionTable = document.querySelector(".auctionTableListContainer");
  let listingContainer = document.createElement("div");
  listingContainer.className = "listingContainer";
  let icon = document.createElement("img");
  let name = document.createElement("p");
  let duration = document.createElement("p");
  let quantity = document.createElement("p");
  let bid = document.createElement("p");
  let buyout = document.createElement("p");

  icon.setAttribute("src", itemMedia.assets[0].value);
  name.textContent = itemData.name;
  duration.textContent = auction.time_left;
  quantity.textContent = auction.quantity;
  bid.textContent = !auction.bid ? auction.bid : "";
  buyout.textContent = auction.buyout;

  listingContainer.appendChild(icon);
  listingContainer.appendChild(name);
  listingContainer.appendChild(duration);
  listingContainer.appendChild(quantity);
  listingContainer.appendChild(bid);
  listingContainer.appendChild(buyout);
  auctionTable.appendChild(listingContainer);
}

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
