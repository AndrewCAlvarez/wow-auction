window.addEventListener("load", (event) => {
  getConnectedRealmIndex();
});

async function loadAuctionHouse() {
  let realmId = document.querySelector(".realmIndexSelect").value;
  console.log(realmId);
  // await getCommodities();
  await getAuctions(realmId);
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
  // INDEX
  // https://us.api.blizzard.com/data/wow/connected-realm/index?namespace=dynamic-us&locale=en_US&access_token=USIgB8vV4o1fqpk8iQAeFv3yqdXFbbcz5q
  // REALM
  // https://us.api.blizzard.com/data/wow/connected-realm/61?namespace=dynamic-us&locale=en_US&access_token=USIgB8vV4o1fqpk8iQAeFv3yqdXFbbcz5q
  console.log("FETCHING CONNECTED REALM INDEX FROM NODEJS APPLICATION");
  const connectedRealmIndexURL = `http://127.0.0.1:3000/api/connected-realm/index`;
  await fetch(connectedRealmIndexURL)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

async function getCommodities() {
  const url = "http://127.0.0.1:3000/api/commodities";
  await fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

async function getAuctions(realmId) {
  // let realmid = document.querySelector(".realmIndexSelect").value;

  console.log("Realm id selected: " + realmId);
  const url = `http://127.0.0.1:3000/api/auctions?realmid=${realmId}`;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // console.log(data.auctions[0]);
      // createElementAuctionListing(data.auctions[0]);
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
