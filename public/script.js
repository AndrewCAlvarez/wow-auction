let accessToken = "";
const hostName = "us.api.blizzard.com";
const namespace = "namespace=dynamic-us&locale=en_US";

let connectedRealms = [];

// const params = {
//   client_id: CLIENT_ID,
//   client_secret: CLIENT_SECRET,
//   grant_type: GRANT_TYPE,

const options = {
  method: "POST",
};

function getAccessToken(clientId, clientSecret, grantType) {
  const fetchTokenPromise = fetch(
    `https://oauth.battle.net/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`,
    options
  );

  console.log(fetchTokenPromise);

  fetchTokenPromise
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      accessToken = data.access_token;
      console.log(accessToken);
    });

  console.log("Fetching access token...");
}

function getConnectedRealms() {
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

module.exports = { getAccessToken, getConnectedRealms };
