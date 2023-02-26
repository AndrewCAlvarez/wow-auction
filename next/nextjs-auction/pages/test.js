import { PrismaClient } from "@prisma/client";
import { getAccessToken } from "../lib/data-retrieval";
import prisma from "../lib/prisma";

export async function getStaticProps() {
  // let accessToken = await getAccessToken();
  // const res = await fetch(
  //   `https://us.api.blizzard.com/data/wow/connected-realm/11/auctions?namespace=dynamic-us&locale=en_US&access_token=${accessToken.access_token}`
  // );
  // let auctions = await res.json();

  // let commoditiesURL =
  //   auctions.commodities.href + "&access_token=" + accessToken.access_token;
  // console.log(commoditiesURL);
  // let commodities = await fetch(commoditiesURL)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     return data;
  //   });

  await prisma.item.create({
    /*
      id                String              @id @default(cuid())
      createdAt         DateTime            @default(now()) @map(name: "created_at")
      updatedAt         DateTime            @updatedAt @map(name: "updated_at")
      name              String
      quality           String
      price_history     String[]
      media             String
      sell_price        Int
      Commodity_Auction Commodity_Auction[]
      Item_Auction      Item_Auction[]
    */
    data: {
      name: "Rousing Ire",
      blizzId: "1230059",
      quality: "Common",
      price_history: [],
      media: "media href",
      sell_price: 5,
    },
  });
  // const items = await prisma.item_Auction.findMany();

  // console.log(items);

  return { props: {}, revalidate: 3600 };
}

export default function Test({}) {
  return (
    <>
      <h2>Test</h2>
      <h3>Auctions</h3>
      <ul>
        {/* {auctions.auctions.map((auction) => (
          <li
            key={auction.id}
          >{`id: ${auction.id}  buyout: ${auction.buyout}`}</li>
        ))} */}
      </ul>
    </>
  );
}
