// import { AccessToken } from "../interfaces/IAccessToken";

interface AccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  sub: string;
}

export async function getAccessToken(): Promise<AccessToken> {
  let accessToken: AccessToken = {
    access_token: "",
    token_type: "",
    expires_in: 0,
    sub: "",
  };
  let clientID = process.env.CLIENT_ID;
  let clientSecret = process.env.CLIENT_SECRET;
  let grantType = process.env.GRANT_TYPE;
  const options = {
    method: "POST",
  };
  const accessTokenURL = `https://oauth.battle.net/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=${grantType}`;

  try {
    await fetch(accessTokenURL, options)
      .then((response) => response.json())
      .then((data) => {
        if (data !== undefined) {
          accessToken = {
            access_token: data.access_token,
            token_type: data.token_type,
            expires_in: data.expires_in,
            sub: data.sub,
          };
          console.log(accessToken);
        }
      });
  } catch (error) {
    console.log(error);
  }
  return accessToken;
}

export async function getCommodities() {
  let accessToken = await getAccessToken();
  const url = `https://${process.env.HOST_NAME}/data/wow/auctions/commodities?${process.env.NAMESPACE}&access_token=${accessToken.access_token}`;

  let commodities;
  await fetch(url)
    .then((response) => response.json())
    .then((commoditiesData) => {
      commodities = commoditiesData;
    });
  return commodities;
}

// export async function getMiningAuctions(accessToken) {
//   console.log("Getting mining auctions...");
//   let miningItemIds = miningItems.items.map((item) => item.id);
//   let commodities = await getCommodities(accessToken);
//   let miningAuctions = commodities.auctions.filter((auction) =>
//     miningItemIds.includes(auction.item.id)
//   );
//   console.log(miningAuctions);

//   return miningAuctions;
// }

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
