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
  const [skillTier, setSkillTier] = useState(professionData.allSkillTiers[0]);

  console.log(professionData);

  function handleChangeTier(skillTier) {
    setSkillTier(skillTier);
    console.log(skillTier.name);
  }

  return (
    <>
      <h2>Test</h2>
      <h3>Auctions</h3>
      <ul>
        {professionData.allSkillTiers.map((skillTier) => {
          return (
            <li onClick={() => handleChangeTier(skillTier)}>
              {skillTier.name}
            </li>
          );
        })}
      </ul>
      <h3>{skillTier.name}</h3>
      <ul>
        {skillTier.categories.map((category) => (
          <li>
            <h4>{category.name}</h4>
            <ul>
              {category.recipes.map((recipe) => (
                <li>{recipe.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
