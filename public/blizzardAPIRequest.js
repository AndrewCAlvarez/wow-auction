// If there are errors with this module in github pages, check firefox and other sources for changing the file type to .mjs

let connectedRealms = [];

// const params = {
//   client_id: CLIENT_ID,
//   client_secret: CLIENT_SECRET,
//   grant_type: GRANT_TYPE,

const options = {
  method: "POST",
};

export function getAccessToken(clientId, clientSecret, grantType) {
  let accessToken = "";

  console.log("Fetching access token...");

  const fetchTokenPromise = fetch(
    `https://oauth.battle.net/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`,
    options
  );

  console.log(fetchTokenPromise);

  fetchTokenPromise
    .then((response) => response.json())
    .then((data) => {
      console.log(
        `\nfetchTokenPromise after response: \n ${fetchTokenPromise}`
      );
      return data.access_token;
    });
}

export function getConnectedRealms(accessToken) {
  const hostName = "us.api.blizzard.com";
  const namespace = "namespace=dynamic-us&locale=en_US";

  fetch(
    `https://${hostName}/data/wow/connected-realm/index?${namespace}&access_token=${accessToken}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      ConnectedRealms = data.connected_realms;
      console.log(ConnectedRealms);
    });
}
// export { getAccessToken, getConnectedRealms };
