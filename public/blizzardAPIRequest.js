let accessToken = "";
let realmIDs = [];
let realmNames = [];
const hostName = "us.api.blizzard.com";
const namespace = "namespace=dynamic-us&locale=en_US";

async function getAccessToken(clientID, clientSecret, grantType) {
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
  let realmIndexData;
  const realmIndexURL = `https://${hostName}/data/wow/connected-realm/index?${namespace}&access_token=${accessToken}`;

  await fetch(realmIndexURL)
    .then((response) => response.json())
    .then((data) => {
      realmIndexData = data;
    });

  return realmIndexData;
}

async function getConnectedRealm(connectedRealmURL) {
  // The realms are grouped together. This function returns an object containing information about a set of realms that are grouped together.
  let connectedRealmData;

  console.log(
    `Attempting to get data from: ${connectedRealmURL}&access_token=${accessToken}`
  );

  await fetch(`${connectedRealmURL}&access_token=${accessToken}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(`REALM DATA: ${data}`);
      connectedRealmData = data;
    });

  return connectedRealmData;
}

async function getRealmListData(clientID, clientSecret, grant_type) {
  let accessToken = await getAccessToken(clientID, clientSecret, grant_type);
  console.log(`Current value of accessToken: ${accessToken}`);

  // Realm index is an array of objects containing only one value: url for each realm.
  const realmIndex = await getConnectedRealmIndex(accessToken);
  let connectedRealm = await getConnectedRealm(
    realmIndex.connected_realms[0].href
  );
  return connectedRealm;
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
}

export { getRealmListData };
