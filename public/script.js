let accessToken = "";
const hostName = "us.api.blizzard.com";
const namespace = "namespace=dynamic-us&locale=en_US";

let connectedRealms = [];

const params = {
  client_id: "701a8a5976ab4346ba5c4b151ca76132",
  client_secret: "MAh3G6I93NogGlz3Kwy8jbdknDJklagd",
  grant_type: "client_credentials",
};

const options = {
  method: "POST",
};

function getAccessToken() {
  const fetchTokenPromise = fetch(
    "https://oauth.battle.net/token?client_id=701a8a5976ab4346ba5c4b151ca76132&client_secret=MAh3G6I93NogGlz3Kwy8jbdknDJklagd&grant_type=client_credentials",
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
