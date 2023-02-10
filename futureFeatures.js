async function getConnectedRealmIndex(clientID, clientSecret, grantType) {
  let realmIndexData;
  let accessToken = await getAccessToken(clientID, clientSecret, grantType);
  const realmIndexURL = `https://${hostName}/data/wow/connected-realm/index?${namespace}&access_token=${accessToken}`;

  // This code in the console is just to add colors to text in nodejs/terminal
  console.log("\x1b[33m%s\x1b[0m", "FUNCTION CALL: getConnectedRealmIndex");
  console.log("\x1b[33m%s\x1b[0m", `ACCESS TOKEN: ${accessToken}`);

  await fetch(realmIndexURL)
    .then((response) => response.json())
    .then((data) => {
      realmIndexData = data;
      // console.log("connected realm index: " + realmIndexData);
    });

  return realmIndexData;
}

async function getConnectedRealm(connectedRealmURL) {
  // A connected realm is a group of individual realm servers. Commodities are sold region-wide across multiple servers. Other items (non-stackables for instance) are still server-specific.
  let connectedRealmData;
  // This code in the console is just to add colors to text in nodejs/terminal
  // console.log("\x1b[33m%s\x1b[0m", "FUNCTION CALL: getConnectedRealm");

  // console.log(
  //   `Attempting to get data from: ${connectedRealmURL}&access_token=${accessToken}`
  // );

  await fetch(`${connectedRealmURL}&access_token=${accessToken}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      connectedRealmData = data;
    });

  return connectedRealmData;
}

async function createConnectedRealmArray(clientID, clientSecret, grantType) {
  let connectedRealmIndex = await getConnectedRealmIndex(
    clientID,
    clientSecret,
    grantType
  );
  let connectedRealmDataArray = [];
  let connectedRealmData;
  await connectedRealmIndex.connected_realms.forEach((connectedRealm) => {
    connectedRealmDataArray.push(getConnectedRealm(connectedRealm.href));
  });
  await Promise.all(connectedRealmDataArray).then((values) => {
    // console.log(values);
    connectedRealmData = values;
  });

  return connectedRealmData;
}

async function getRealmIndex(clientID, clientSecret, grant_type) {
  let accessToken = await getAccessToken(clientID, clientSecret, grant_type);
  const url = `https://${hostName}/data/wow/realm/index?${namespace}&access_token=${accessToken}`;
  let realmIndex;

  await fetch(url)
    .then((response) => response.json())
    .then((realmIndexData) => {
      realmIndex = realmIndexData;
    });

  return realmIndex;
}

// TODO: This function only gets a small group of realms. Change it so that it returns all realms. This is for CONNECTED REALMS. There is an api for realms specifically and the app needs to be updated.
async function getRealmListData(clientID, clientSecret, grant_type) {
  // Returns an array of general data about all realms given a Blizzard-generated client Id, secret and grant type.
  let accessToken = await getAccessToken(clientID, clientSecret, grant_type);
  console.log(`Current value of accessToken: ${accessToken}`);

  // Realm index is an array of objects containing only one value: href for each group of connected realms.
  const realmIndex = await getConnectedRealmIndex(accessToken);

  let connectedRealm = await getConnectedRealm(
    realmIndex.connected_realms[0].href
  );

  // let auctionData = await getAuctionData(connectedRealm.auctions.href);
  return connectedRealm;
  // res.send(connectedRealm);
}

async function getAuctions(clientID, clientSecret, grant_type, realmId) {
  let accessToken = await getAccessToken(clientID, clientSecret, grant_type);
  console.log(`Current value of accessToken: ${accessToken}`);
  const url = `https://${hostName}/data/wow/connected-realm/${realmId}/auctions?${namespace}&access_token=${accessToken}`;

  let auctions;
  await fetch(url)
    .then((response) => response.json())
    .then((auctionData) => {
      // console.log(auctionData);
      auctions = auctionData;
    });
  return auctions;
}

async function searchItemByName(clientID, clientSecret, grant_type, itemName) {
  let searchResults;
  const url = `https://${hostName}/data/wow/search/item?namespace=static-us&name.en_US=${itemName}&orderby=id&_page=1&access_token=${accessToken}`;
  await getAccessToken(clientID, clientSecret, grant_type);
  await fetch(
    `https://us.api.blizzard.com/data/wow/search/item?namespace=static-us&name.en_US=${itemName}&orderby=id&_page=1&access_token=${accessToken}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      searchResults = data;
    });

  return searchResults;
}

async function getConnectedRealmAuctionData(realmAuctionURL) {
  // Returns ALL auctions shared between a group of realms based on the connected realms' URL.
  const url = `${realmAuctionURL}&access_token=${accessToken}`;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
}
