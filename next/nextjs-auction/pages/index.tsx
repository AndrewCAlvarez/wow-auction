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
  updateProfessionDb,
} from "../lib/database/prismaActions";
import { getAuctions } from "../lib/blizzard/auction";
import { Auction } from "../interfaces/IAuction";

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

  // let testRecipe = await getRecipeById(38729);
  // let testRecipe1 = await getRecipeById(38730);
  // let testRecipe2 = await getRecipeById(38731);
  // let recipesArray = [testRecipe, testRecipe1, testRecipe2];

  try {
    // const deleteProfessions = await prisma.profession.deleteMany();
    // const addProfessions = await prisma.profession.createMany({
    //   data: professions.map((profession) => ({
    //     professionId: profession.id,
    //     name: profession.name,
    //   })),
    // });
    // const createMany = await prisma.recipe.createMany({
    //   data: skillTierRecipes.map((recipe) => ({
    //     data: JSON.stringify(recipe),
    //   })),
    // });
    // console.log(getRecipes);
  } catch (error) {
    console.error(error);
  }
  // let professionRecipes = await getRecipesByProfession(professions[2]);
  // for (let recipe of professionRecipes) {
  //   let item = await getItemById(recipe);
  // }
  // await updateProfessionDb();
  // await updateAuctionDb();
  const professions = await prisma.profession.findMany();
  const blacksmithingRecipes = await prisma.recipe.findMany();
  const prismaAuctions = await prisma.auction.findMany();
  // TODO: There is problem with this auction model
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
  console.log(professions);
  console.log(blacksmithingRecipes);
  let shadowlandsRecipes = blacksmithingRecipes.filter(
    (recipe) => recipe.skillTierId === 2751
  );
  for (let recipe of shadowlandsRecipes) {
    recipe.auctions = auctions.filter(
      (auction) => auction.itemId === recipe.itemId
    );
    console.log(recipe);
  }

  console.log(shadowlandsRecipes);
  console.log(auctions);

  // const [skillTier, setSkillTier] = useState(professionData.allSkillTiers[0]);
  // const [filteredAuctions, setFilteredAuctions] = useState([]);
  // console.log(professionData);
  // function handleChangeTier(skillTier) {
  //   setSkillTier(skillTier);
  //   console.log(skillTier.name);
  // }

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
      <h1>{}</h1>
      {/* <h2>Test</h2>
      <ul>
        {professionData.allSkillTiers.map((skillTier) => {
          return (
            <li onClick={() => handleChangeTier(skillTier)}>
              {skillTier.name}
            </li>
          );
        })}
      </ul>
      <SkillTierSummary skillTier={skillTier} />
      <h3>Auctions</h3>

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
      </ul> */}
    </>
  );
}
