import { PrismaClient } from "@prisma/client";
import { getAccessToken } from "../lib/data-retrieval";
import { getCommodities } from "../lib/data-retrieval";
import { getRecipe } from "../lib/blizzard/profession";
import { getProfessionData } from "../lib/blizzard/profession";
// import prisma from "../lib/prisma";
import { useState } from "react";
import Link from "next/link";

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

    // const auctions = await prisma.auction.findMany();
    // const commodities = await prisma.commodity.findMany();
    const professionData = await getProfessionData();

    return {
      props: {
        // auctions: auctions.map((auction) => ({
        //   id: auction.id,
        //   itemId: auction.itemId,
        //   quantity: auction.quantity,
        //   buyout: Number(auction.buyout),
        // })),
        // commodities: commodities.map((commodity) => ({
        //   id: commodity.id,
        //   itemId: commodity.itemId,
        //   quantity: commodity.quantity,
        //   unitPrice: Number(commodity.unit_price),
        // })),
        professionData,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.log(error);
  }
  return { props: {}, revalidate: 3600 };
}

export default function Test({
  // auctions, commodities,
  professionData,
}) {
  const [skillTier, setSkillTier] = useState(professionData.allSkillTiers[0]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);

  console.log(professionData);
  // console.log(auctions);
  // console.log(commodities);

  function handleChangeTier(skillTier) {
    setSkillTier(skillTier);
    console.log(skillTier.name);
  }

  return (
    <>
      <h2>Test</h2>
      <ul>
        {professionData.allSkillTiers.map((skillTier) => {
          return (
            <li onClick={() => handleChangeTier(skillTier)}>
              {skillTier.name}
            </li>
          );
        })}
      </ul>
      <h3>Auctions</h3>
      <button onClick={() => getAuctions(5)}>Get Auctions</button>
      <ul>
        {filteredAuctions
          ? filteredAuctions.map((filteredAuction) => (
              <li>
                {filteredAuction.name} | {filteredAuction.quantity} |{" "}
                {filteredAuction.buyout}
              </li>
            ))
          : ""}
      </ul>
      <h3>{skillTier.name}</h3>
      <ul>
        {skillTier.categories.map((category) => (
          <li>
            <h4>{category.name}</h4>
            <ul>
              {category.recipes.map((recipe) => (
                <li>
                  <Link href={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
