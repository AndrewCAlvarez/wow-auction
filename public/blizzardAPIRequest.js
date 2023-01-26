// // If there are errors with this module in github pages, check firefox and other sources for changing the file type to .mjs

// let connectedRealms = [];

// // const params = {
// //   client_id: CLIENT_ID,
// //   client_secret: CLIENT_SECRET,
// //   grant_type: GRANT_TYPE,

// const options = {
//   method: "POST",
// };

// export function getAccessToken(clientId, clientSecret, grantType) {
//   let accessToken = "";

//   console.log("Fetching access token...");

//   const fetchTokenPromise = fetch(
//     `https://oauth.battle.net/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`,
//     options
//   );

//   console.log(fetchTokenPromise);

//   fetchTokenPromise
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(
//         `\nfetchTokenPromise after response: \n ${fetchTokenPromise}`
//       );
//       return data.access_token;
//     });
// }

// export function getConnectedRealms(accessToken) {
//   const hostName = "us.api.blizzard.com";
//   const namespace = "namespace=dynamic-us&locale=en_US";

//   fetch(
//     `https://${hostName}/data/wow/connected-realm/index?${namespace}&access_token=${accessToken}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       ConnectedRealms = data.connected_realms;
//       console.log(ConnectedRealms);
//     });
// }
// export { getAccessToken, getConnectedRealms };

import dotenv from "dotenv";
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

async function getRealmIndex(accessToken) {
  let realmIndexData;
  const realmIndexURL = `https://${hostName}/data/wow/connected-realm/index?${namespace}&access_token=${accessToken}`;

  await fetch(realmIndexURL)
    .then((response) => response.json())
    .then((data) => {
      realmIndexData = data;
    });

  return realmIndexData;
}

async function getRealmListData(clientID, clientSecret, grant_type) {
  let accessToken = await getAccessToken(clientID, clientSecret, grant_type);
  console.log(`Current value of accessToken: ${accessToken}`);

  const realmIndex = await getRealmIndex(accessToken);
  console.log(realmIndex);
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
