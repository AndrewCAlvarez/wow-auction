let state = {
  connectedRealmData: [],
};

window.addEventListener("load", (event) => {
  getConnectedRealmIndex().then((connectedRealmList) => {
    state.connectedRealmData = connectedRealmList;
    loadRealmSelectElement();
  });
});

function loadRealmSelectElement() {
  let realmIndexSelectElement = document.querySelector(".realmIndexSelect");
  state.connectedRealmData.forEach((connectedRealm) => {
    connectedRealm.realms.forEach((realm) => {
      if (!document.querySelector(`#realm${connectedRealm.id}`)) {
        let realmIndexOptionElement = document.createElement("option");
        realmIndexOptionElement.id = "realm" + connectedRealm.id;
        realmIndexOptionElement.value = connectedRealm.id;
        realmIndexOptionElement.textContent = realm.name.en_US;
        realmIndexSelectElement.appendChild(realmIndexOptionElement);
      }
    });
  });
}

async function getRealmIndex() {
  const url = "http://127.0.0.1:3000/api/realm-index";
  await fetch(url)
    .then((response) => response.json())
    .then((realmIndex) => {
      console.log(realmIndex);
      let realmIndexArray = [];
      realmIndex.realms.forEach((realm) => {
        let realmData = {
          name: realm.name,
          id: realm.id,
        };
        realmIndexArray.push(realmData);
      });
      console.log(realmIndexArray);

      realmIndexArray.forEach((realm) => {
        // console.log(realm.name);
        // Create dropdown list to select realm by name
        console.log(!document.querySelector(`#realm${realm.id}`));
        if (!document.querySelector(`#realm${realm.id}`)) {
          let realmIndexSelectElement =
            document.querySelector(".realmIndexSelect");
          let realmIndexOptionElement = document.createElement("option");
          realmIndexOptionElement.id = "realm" + realm.id;
          realmIndexOptionElement.value = realm.id;
          realmIndexOptionElement.textContent = realm.name;
          realmIndexSelectElement.appendChild(realmIndexOptionElement);
        }
      });
    });
}

async function getConnectedRealmIndex() {
  console.log("FETCHING CONNECTED REALM INDEX FROM NODEJS APPLICATION");
  const connectedRealmIndexURL = `http://127.0.0.1:3000/api/connected-realm/index`;
  let realmList;
  await fetch(connectedRealmIndexURL)
    .then((response) => response.json())
    .then((data) => {
      realmList = data;
    });

  return realmList;
}

async function getCommodities() {
  const url = "http://127.0.0.1:3000/api/commodities";
  await fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

async function getAuctions() {
  let realmId = document.querySelector(".realmIndexSelect").value;
  // console.log("Realm id selected: " + realmId);
  console.log("Getting Auctions...\n");
  const url = `http://127.0.0.1:3000/api/auctions?realmid=${realmId}`;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let index = 0; index < 100; index++) {
        generateAuctionTableListing(data.auctions[index]);
      }
      data.auctions.forEach((auction) => {
        // NOTE: Doing this makes too many requests and takes forever to load.
        // generateAuctionTableListing(auction);
      });
      // console.log(data.auctions[0]);
      // createElementAuctionListing(data.auctions[0]);
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
  // console.log("auction id logged: " + auction.id);
  // console.log("itemData id logged: " + itemData.name);
  let listingContainer = document.querySelector(".auctionTableListContainer");
  let icon = document.createElement("p");
  let name = document.createElement("p");
  let duration = document.createElement("p");
  let quantity = document.createElement("p");
  let bid = document.createElement("p");
  let buyout = document.createElement("p");

  icon.textContent = "ICON";
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
}

async function getItemById(itemId) {
  console.log(itemId);
  let itemData;
  const url = `http://127.0.0.1:3000/api/item?itemid=${itemId}`;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("getItemById: " + data.name);
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
