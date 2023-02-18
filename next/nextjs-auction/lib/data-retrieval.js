import { miningItems } from "../../../public/scripts/miningItems";

export async function getAccessToken(clientID, clientSecret, grantType) {
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
  let miningItemIds = miningItems.items.map((item) => item.id);
  let commodities = await getCommodities(accessToken);
  let miningAuctions = commodities.auctions.filter((auction) =>
    miningItemIds.includes(auction.item.id)
  );

  return miningAuctions;
}
