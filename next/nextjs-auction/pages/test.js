import { PrismaClient } from "@prisma/client";
import { getAccessToken } from "../lib/data-retrieval";
import prisma from "../lib/prisma";

export async function getStaticProps() {
  let accessToken = await getAccessToken();
  const res = await fetch(
    `https://us.api.blizzard.com/data/wow/connected-realm/11/auctions?namespace=dynamic-us&locale=en_US&access_token=${accessToken.access_token}`
  );
  let auctionData = await res.json();
  console.log(auctionData);

  try {
    await prisma.auction.deleteMany();
    await prisma.item.deleteMany();
    let auctions = auctionData.auctions.map((auction) => {
      // console.log(typeof auction.buyout);
      // if (typeof auction.buyout != Number) {
      //   console.log(auction.buyout);
      // }
      return {
        itemId: auction.id,
        quantity: auction.quantity,
        buyout: auction.buyout,
      };
    });
    const createAuctions = await prisma.auction.createMany({
      data: auctionData.auctions.map((auction) => ({
        itemId: auction.item.id,
        quantity: auction.quantity,
        buyout: auction.buyout,
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
