import { miningItems } from "./public/scripts/miningItems.js";

const hostName = "us.api.blizzard.com";
const namespace = "namespace=dynamic-us&locale=en_US";
const namespaceStatic = "namespace=static-us&locale=en_US";

async function getAccessToken(clientID, clientSecret, grantType) {
  let accessToken;
  const options = {
    method: "POST",
  };
  const accessTokenURL = `https://oauth.battle.net/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=${grantType}`;

  await fetch(accessTokenURL, options)
    .then((response) => response.json())
    .then((data) => {
      accessToken = data;
    });

  return accessToken;
}

async function getCommodities(accessToken) {
  console.log(`Current value of accessToken: ${accessToken}`);
  const url = `https://${hostName}/data/wow/auctions/commodities?${namespace}&access_token=${accessToken}`;

  let commodities;
  await fetch(url)
    .then((response) => response.json())
    .then((commoditiesData) => {
      commodities = commoditiesData;
    });
  return commodities;
}

async function getItemById(accessToken, itemId) {
  // I don't know why but the namespace is different for items. Static is used instead.
  const url = `https://${hostName}/data/wow/item/${itemId}?${namespaceStatic}&access_token=${accessToken}`;
  try {
    let item;

    await fetch(url)
      .then((response) => response.json())
      .then((itemData) => {
        console.log(itemData);
        item = itemData;
      });

    return item;
  } catch (error) {
    console.error(error);
  }
}

async function getItemMedia(accessToken, itemId) {
  // https://us.api.blizzard.com/data/wow/media/item/19019?namespace=static-us&locale=en_US&access_token=US9BXh300LGvJx4hGvFB5sff6oqixxsKey
  const url = `https://${hostName}/data/wow/media/item/${itemId}?${namespaceStatic}&access_token=${accessToken}`;

  try {
    let itemMedia = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      });
  } catch (error) {
    console.error(error);
  }

  // return itemMedia;
}

async function getToken(accessToken) {
  const url = `https://${hostName}/data/wow/token/index?${namespace}&access_token=${accessToken}`;

  try {
    let token = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return token;
  } catch (error) {
    console.error(error);
  }
}

async function getMiningAuctions(accessToken) {
  let miningItemIds = miningItems.items.map((item) => item.id);
  let commodities = await getCommodities(accessToken);
  let miningAuctions = commodities.auctions.filter((auction) =>
    miningItemIds.includes(auction.item.id)
  );

  return miningAuctions;
}

export {
  getAccessToken,
  getCommodities,
  getItemById,
  getItemMedia,
  getToken,
  getMiningAuctions,
};
