import Link from "next/link";
import { useState } from "react";
import {
  getProfessionIndex,
  getProfessionData,
  getProfessions,
  getSkillTierById,
  getSkillTiersByProfession,
  getRecipesBySkillTier,
  getRecipesByProfession,
  getRecipeById,
} from "../lib/blizzard/profession";
import SkillTierSummary from "../components/skillTierSummary";
import { GetStaticProps } from "next";
import { Profession } from "../interfaces/IProfession";
import { ProfessionIndex } from "../interfaces/IProfessionIndex";
import { SkillTier } from "../interfaces/ISkillTier";
import { Recipe } from "../interfaces/IRecipe";
import { getItemById } from "../lib/blizzard/item";
import prisma from "../lib/prisma";
import { test } from "gray-matter";
import {
  updateAuctionDb,
  updateDragonflightProfessionDb,
  updateProfessionDb,
} from "../lib/database/prismaActions";
import { getAuctions } from "../lib/blizzard/auction";
import { Auction } from "../interfaces/IAuction";
import { dragonIslesRecipes } from "../lib/dragonIslesCraftedItems";
import {
  Blacksmithing,
  createBlacksmithingObject,
} from "../interfaces/IBlacksmithing";

export const getStaticProps: GetStaticProps = async (context) => {
  // let professions: Profession[] = [];

  // const auctions = await prisma.auction.findMany();
  // const commodities = await prisma.commodity.findMany();
  // professionData = await getProfessionData();
  // let professionIndex = await getProfessionIndex();
  // let professions = await getProfessions(professionIndex);

  // let skillTier = await getSkillTierById(
  //   professions[2].id,
  //   professions[2].skill_tiers[2].id
  // );
  // let professionSkillTiers = await getSkillTiersByProfession(professions[2]);
  // let skillTierRecipes = await getRecipesBySkillTier(professions[2], skillTier);
  // for (let skillTier of professionSkillTiers) {
  //   if (skillTier.id !== 2822) {
  //     try {
  //       let skillTierRecipes = await getRecipesBySkillTier(
  //         professions[2],
  //         skillTier
  //       );
  //       const addRecipes = await prisma.recipe.createMany({
  //         data: skillTierRecipes.map((recipe) => {
  //           console.log(recipe);
  //           if (recipe.alliance_crafted_item) {
  //             return {
  //               data: JSON.stringify(recipe),
  //               professionId: recipe.professionId,
  //               allianceItemId: recipe.alliance_crafted_item.id,
  //               hordeItemId: recipe.horde_crafted_item?.id,
  //               category: recipe.category,
  //               skillTierId: recipe.skillTierId,
  //               skillTierName: recipe.skillTierName,
  //               name: recipe.name,
  //             };
  //           }
  //           return {
  //             data: JSON.stringify(recipe),
  //             professionId: recipe.professionId,
  //             itemId: recipe.crafted_item?.id,
  //             category: recipe.category,
  //             skillTierId: recipe.skillTierId,
  //             skillTierName: recipe.skillTierName,
  //             name: recipe.name,
  //           };
  //         }),
  //         skipDuplicates: true,
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }

  // let professionRecipes = await getRecipesByProfession(professions[2]);
  // for (let recipe of professionRecipes) {
  //   let item = await getItemById(recipe);
  // }

  if (false) {
    // TODO: Set these to update at specified interval
    // await updateProfessionDb();
    // await updateAuctionDb();
    // await updateDragonflightProfessionDb();
  }

  const professions = await prisma.profession.findMany();
  const blacksmithingRecipes = await prisma.recipe.findMany({
    orderBy: [
      {
        skillTierName: "asc",
      },
      {
        category: "asc",
      },
    ],
  });
  const prismaAuctions = await prisma.auction.findMany();
  const auctions = prismaAuctions.map((auction) => ({
    auctionId: auction.id,
    itemId: auction.itemId,
    quantity: auction.quantity,
    buyout: Number(auction.buyout),
  }));

  return {
    props: {
      professions,
      blacksmithingRecipes,
      auctions,
    },
  };
};

export default function Home({
  professions,
  blacksmithingRecipes,
  auctions,
}: {
  professions: Profession[];
  blacksmithingRecipes: Recipe[];
  auctions: Auction[];
}) {
  const [profession, setProfession] = useState({ profession: professions[2] });
  const [filteredAuctions, setFilteredAuctions] = useState({});
  const blacksmithing: Blacksmithing =
    createBlacksmithingObject(blacksmithingRecipes);

  function filterAuctionsBySkillTier() {
    console.log(blacksmithing.skillTiers[0].name);
    console.log(auctions);
    let newAuctions = blacksmithing.skillTiers[0].categories.map((category) =>
      category.recipes.map((recipe) => {
        let recipeAuctions = auctions.filter(
          (auction) => auction.itemId === recipe.itemId
        );
        blacksmithing.skillTiers;
      })
    );
    newAuctions.forEach((auction) => {});
    console.log(newAuctions);
  }
  filterAuctionsBySkillTier();

  return (
    // <Layout home>
    //   <Head>
    //     <title>{siteTitle}</title>
    //   </Head>

    //   <section className={utilStyles.headingMd}>
    //     <ul>
    //       <li>
    //         <Link href="/test">Test</Link>
    //       </li>
    //     </ul>
    //   </section>

    // </Layout>
    <>
      <h1>{profession.profession.name}</h1>
      {blacksmithing.skillTiers.map((skillTier) => {
        return (
          <ul>
            <li style={{ fontSize: 30 }}>{skillTier.name}</li>

            <li>
              {skillTier.categories.map((category) => (
                <ul>
                  <li style={{ fontSize: 25, color: "#aaa" }}>
                    {category.name}
                  </li>
                  {category.recipes.map((recipe) => (
                    <li style={{ fontSize: 20, color: "#aaa" }}>
                      {recipe.name}
                    </li>
                  ))}
                </ul>
              ))}
            </li>
          </ul>
        );
      })}
    </>
  );
}
