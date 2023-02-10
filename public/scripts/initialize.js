function loadAuctionHouse() {
  getAuctions().then((auctionData) => {
    console.log(auctionData);
  });
  // .then(() => {
  //   console.log("Load auction auction data:");
  //   console.log(state.auctionData);
  // });
  // console.log(`Commodity data: ${state.commodityData}`);
}

function loadCommodities() {
  getCommodities().then((commoditiesData) => {
    console.log(commoditiesData);
  });
}

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
