async function load() {
  await getMiningAuctions();
  await getToken();
}

async function getMiningAuctions() {
  const url = "/api/auctions/profession/mining";
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("miningAuctions", JSON.stringify(data));
      localStorage.setItem("timeSinceLastMiningAuctionRequest", Date.now());
    });
}

async function getToken() {
  const url = "/api/token";
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("token", JSON.stringify(data));
    });
}

async function getItemById(itemId) {
  const url = "/api/item?itemid=" + itemId;
  try {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  } catch (error) {
    console.log(error);
  }
}

async function getItemMedia(itemId) {
  const url = "/api/data/media/item?itemid=" + itemId;
  let media;
  try {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        media = data;
      });
  } catch (error) {
    console.error(error);
  }

  return media;
}

load();
