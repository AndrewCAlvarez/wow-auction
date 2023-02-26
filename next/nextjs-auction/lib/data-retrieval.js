import { miningItems } from "../../../public/scripts/miningItems";

export async function getAccessToken(clientID, clientSecret, grantType) {
  let accessToken;
  clientID = process.env.CLIENT_ID;
  clientSecret = process.env.CLIENT_SECRET;
  grantType = process.env.GRANT_TYPE;
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

export async function getCommodities(accessToken) {
  console.log(`Current value of accessToken: ${accessToken.access_token}`);
  const url = `https://${process.env.HOST_NAME}/data/wow/auctions/commodities?${process.env.NAMESPACE}&access_token=${accessToken.access_token}`;

  let commodities;
  await fetch(url)
    .then((response) => response.json())
    .then((commoditiesData) => {
      commodities = commoditiesData;
    });
  return commodities;
}

export async function getMiningAuctions(accessToken) {
  console.log("Getting mining auctions...");
  let miningItemIds = miningItems.items.map((item) => item.id);
  let commodities = await getCommodities(accessToken);
  let miningAuctions = commodities.auctions.filter((auction) =>
    miningItemIds.includes(auction.item.id)
  );
  console.log(miningAuctions);

  return miningAuctions;
}

// Might use this later
// let auctions = await fetch(
//   "https://us.api.blizzard.com/data/wow/connected-realm/11/auctions?namespace=dynamic-us&locale=en_US&access_token=USJWrHNDk7G9t9qxt2i0afzdg9auP8iNux"
// )
//   .then((response) => response.json())
//   .then((data) => {
//     return data;
//   });
// let commodities = await fetch(
//   auctions.commodities.href +
//     "&access_token=USJWrHNDk7G9t9qxt2i0afzdg9auP8iNux"
// )
//   .then((response) => response.json())
//   .then((data) => {
//     return data;
//   });
