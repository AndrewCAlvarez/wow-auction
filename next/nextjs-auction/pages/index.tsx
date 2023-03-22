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

export const getStaticProps: GetStaticProps = async (context) => {
  // let professions: Profession[] = [];

  // const auctions = await prisma.auction.findMany();
  // const commodities = await prisma.commodity.findMany();
  // professionData = await getProfessionData();
  let professionIndex = await getProfessionIndex();
  let professions = await getProfessions(professionIndex);

  let skillTier = await getSkillTierById(
    professions[2].id,
    professions[2].skill_tiers[0].id
  );
  let professionSkillTiers = await getSkillTiersByProfession(professions[2]);
  let skillTierRecipes = await getRecipesBySkillTier(professions[2], skillTier);
  try {
    const addRecipes = await prisma.recipe.createMany({
      data: skillTierRecipes.map((recipe) => {
        console.log(recipe);
        if (recipe.alliance_crafted_item) {
          return {
            data: JSON.stringify(recipe),
            professionId: recipe.professionId,
            allianceItemId: recipe.alliance_crafted_item.id,
            hordeItemId: recipe.horde_crafted_item?.id,
            category: recipe.category,
            skillTierId: recipe.skillTierId,
            skillTierName: recipe.skillTierName,
            name: recipe.name,
          };
        }
        return {
          data: JSON.stringify(recipe),
          professionId: recipe.professionId,
          itemId: recipe.itemId,
          category: recipe.category,
          skillTierId: recipe.skillTierId,
          skillTierName: recipe.skillTierName,
          name: recipe.name,
        };
      }),
    });
  } catch (error) {
    console.error(error);
  }

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
    const getRecipes = await prisma.recipe.findMany();
    // console.log(getRecipes);
  } catch (error) {
    console.error(error);
  }
  // let professionRecipes = await getRecipesByProfession(professions[2]);
  // for (let recipe of professionRecipes) {
  //   let item = await getItemById(recipe);
  // }

  return {
    props: {
      professionIndex,
      professions,
      skillTier,
      professionSkillTiers,
    },
  };
};

export default function Home({
  professions,
  professionIndex,
  skillTier,
  professionSkillTiers,
}: {
  professions: Profession[];
  professionIndex: ProfessionIndex;
  skillTier: SkillTier;
  professionSkillTiers: SkillTier[];
}) {
  // console.log(skillTierRecipes);
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
