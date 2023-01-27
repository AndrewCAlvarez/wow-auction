let accessToken = "";
let realmIDs = [];
let realmNames = [];
const hostName = "us.api.blizzard.com";
const namespace = "namespace=dynamic-us&locale=en_US";

async function getAccessToken(clientID, clientSecret, grantType) {
  // This code in the console is just to add colors to text in nodejs/terminal
  console.log("\x1b[33m%s\x1b[0m", "FUNCTION CALL: getAccessToken");

  const options = {
    method: "POST",
  };
  const accessTokenURL = `https://oauth.battle.net/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=${grantType}`;

  await fetch(accessTokenURL, options)
    .then((response) => response.json())
    .then((data) => {
      accessToken = data.access_token;
    });

  return accessToken;
}

async function getConnectedRealmIndex(accessToken) {
  // This code in the console is just to add colors to text in nodejs/terminal
  console.log("\x1b[33m%s\x1b[0m", "FUNCTION CALL: getConnectedRealmIndex");
  let realmIndexData;
  const realmIndexURL = `https://${hostName}/data/wow/connected-realm/index?${namespace}&access_token=${accessToken}`;

  await fetch(realmIndexURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(realmIndexData);
      realmIndexData = data;
    });

  return realmIndexData;
}

async function getConnectedRealm(connectedRealmURL) {
  // A connected realm is a group of individual realm servers. Commodities are sold region-wide across multiple servers. Other items (non-stackables for instance) are still server-specific.
  let connectedRealmData;
  // This code in the console is just to add colors to text in nodejs/terminal
  console.log("\x1b[33m%s\x1b[0m", "FUNCTION CALL: getConnectedRealm");

  console.log(
    `Attempting to get data from: ${connectedRealmURL}&access_token=${accessToken}`
  );

  await fetch(`${connectedRealmURL}&access_token=${accessToken}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      connectedRealmData = data;
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

async function getCommodities(clientID, clientSecret, grant_type) {
  let accessToken = await getAccessToken(clientID, clientSecret, grant_type);
  console.log(`Current value of accessToken: ${accessToken}`);
  const url = `https://${hostName}/data/wow/auctions/commodities?${namespace}&access_token=${accessToken}`;

  let commodities;
  await fetch(url)
    .then((response) => response.json())
    .then((commoditiesData) => {
      console.log(commoditiesData);
      commodities = commoditiesData;
    });
  return commodities;
}

async function getConnectedRealmAuctionData(realmAuctionURL) {
  // Returns ALL auctions shared between a group of realms based on the connected realms' URL.
  const url = `${realmAuctionURL}&access_token=${accessToken}`;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

// console.log(realmIndex.connected_realm[0]);
// console.log(getConnectedRealm(realmIndex[2]));
// .then(() =>
//   fetch(
//     `https://${hostName}/data/wow/connected-realm/index?${namespace}&access_token=${accessToken}`
//   )
// )
// .then((response) => response.json())
// .then((data) => {
//   data.connected_realms.forEach((realmhref) => {
//     realmIDs.push(
//       realmhref.href
//         .replace(
//           "https://us.api.blizzard.com/data/wow/connected-realm/",
//           ""
//         )
//         .replace("?namespace=dynamic-us", "")
//     );
//   });
//   // console.log(realmIDs);
//   // res.json(data);
// })
// .then(() => {
//   let realmData = [];
//   realmIDs.forEach((realmID) => {
//     realmData.push(
//       fetch(
//         `https://${hostName}/data/wow/connected-realm/${realmID}?${namespace}&access_token=${accessToken}`
//       )
//     );
//   });

//   // Fetch individual realm info and push to realms array.
//   Promise.all(realmData).then((responses) => {
//     for (const response of responses) {
//       if (response.status === 200) {
//         response
//           .json()
//           .then((data) => {
//             realmNames.push(data.realms[0].name);
//             // The realmNames array is being populated, but I'm having trouble sending it to the frontend. I think it's an issue of misunderstanding promises.
//           })
//           .then(console.log(`FINAL REALM LIST: \n${realmNames}`));
//       }
//     }
//   });
// })
// .catch((error) => {
//   console.error(`ERROR: ${error}`);
// });

export { getRealmIndex, getCommodities, getRealmListData };
