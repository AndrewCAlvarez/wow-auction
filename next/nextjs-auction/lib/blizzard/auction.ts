import { Auction } from "@prisma/client";
import { getAccessToken } from "../accessToken";

export async function getAuctions() {
  const accessToken = await getAccessToken();
  const url = `https://us.api.blizzard.com/data/wow/connected-realm/11/auctions?namespace=dynamic-us&locale=en_US&access_token=${accessToken.access_token}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.auctions;
}
