import { PrismaClient } from "@prisma/client";
import { getAccessToken } from "../lib/data-retrieval";
import prisma from "../lib/prisma";

export async function getStaticProps() {
  let accessToken = await getAccessToken();
  const res = await fetch(
    `https://us.api.blizzard.com/data/wow/connected-realm/11/auctions?namespace=dynamic-us&locale=en_US&access_token=${accessToken.access_token}`
  );
  let auctionData = await res.json();
  async function getCommodities(accessToken) {
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

  let commoditiesData = await getCommodities(accessToken);
  console.log(commoditiesData);
  try {
    await prisma.auction.deleteMany();
    await prisma.item.deleteMany();

    const createAuctions = await prisma.auction.createMany({
      data: auctionData.auctions.map((auction) => ({
        itemId: auction.item.id,
        quantity: auction.quantity,
        buyout: auction.buyout,
      })),
    });

    const createCommodities = await prisma.commodity.createMany({
      data: commoditiesData.auctions.map((auction) => ({
        itemId: auction.item.id,
        quantity: auction.quantity,
        unit_price: auction.unit_price,
      })),
    });
    // const items = await prisma.item.findMany();
    // itemData = items.map((item) => ({
    //   name: item.name,
    //   quality: item.quality,
    // }));
    // console.log(itemData);
  } catch (error) {
    console.log(error);
  }
  return { props: {}, revalidate: 3600 };
}

export default function Test({}) {
  return (
    <>
      <h2>Test</h2>
      <h3>Auctions</h3>
      <ul>{/* <li>{itemData[0].name}</li> */}</ul>
    </>
  );
}
