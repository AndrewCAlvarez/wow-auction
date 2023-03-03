export async function getCommodities(accessToken) {
  console.log(`Current value of accessToken: ${accessToken}`);
  const url = `https://us.api.blizzard.com/data/wow/auctions/commodities?namespace=dynamic-us&access_token=${accessToken.access_token}`;

  let commodities;
  await fetch(url)
    .then((response) => response.json())
    .then((commoditiesData) => {
      commodities = commoditiesData;
    });
  return commodities;
}
