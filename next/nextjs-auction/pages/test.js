import { PrismaClient } from "@prisma/client";
import { getAccessToken } from "../lib/data-retrieval";
import { getCommodities } from "../lib/data-retrieval";
import { getProfessionData } from "../lib/blizzard/profession";
import prisma from "../lib/prisma";
import { useState } from "react";

export async function getStaticProps() {
  // let accessToken = await getAccessToken();
  // const res = await fetch(
  //   `https://us.api.blizzard.com/data/wow/connected-realm/11/auctions?namespace=dynamic-us&locale=en_US&access_token=${accessToken.access_token}`
  // );
  // let auctionData = await res.json();

  // let commoditiesData = await getCommodities(accessToken);

  try {
    // await prisma.auction.deleteMany();
    // await prisma.item.deleteMany();

    // const createAuctions = await prisma.auction.createMany({
    //   data: auctionData.auctions.map((auction) => ({
    //     itemId: auction.item.id,
    //     quantity: auction.quantity,
    //     buyout: auction.buyout,
    //   })),
    // });

    // const createCommodities = await prisma.commodity.createMany({
    //   data: commoditiesData.auctions.map((auction) => ({
    //     itemId: auction.item.id,
    //     quantity: auction.quantity,
    //     unit_price: auction.unit_price,
    //   })),
    // });

    const auctions = await prisma.auction.findMany();
    let professionData = await getProfessionData();
    return {
      props: {
        auctions: auctions.map((auction) => ({
          id: auction.id,
          itemId: auction.itemId,
          quantity: auction.quantity,
          buyout: Number(auction.buyout),
        })),
        professionData,
      },
    };
  } catch (error) {
    console.log(error);
  }
  return { props: { auctions }, revalidate: 3600 };
}

export default function Test({ auctions, professionData }) {
  const [skillTier, setSkillTier] = useState({
    name: professionData.skillTierIndex.skill_tiers[0].name,
  });
  console.log(professionData);

  function handleChangeTier(skillTierName) {
    setSkillTier({ name: skillTierName });
    console.log(skillTierName);
  }

  return (
    <>
      <h2>Test</h2>
      <h3>Auctions</h3>
      <ul>
        {professionData.skillTierIndex.skill_tiers.map((skillTier) => {
          return (
            <li onClick={() => handleChangeTier(skillTier.name)}>
              {" "}
              {skillTier.name}
            </li>
          );
        })}
      </ul>
      <h3>{skillTier.name}</h3>
    </>
  );
}
