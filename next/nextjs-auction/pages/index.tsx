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
} from "../lib/blizzard/profession";
import SkillTierSummary from "../components/skillTierSummary";
import { GetStaticProps } from "next";
import { Profession } from "../interfaces/IProfession";
import { ProfessionIndex } from "../interfaces/IProfessionIndex";
import { SkillTier } from "../interfaces/ISkillTier";
import { Recipe } from "../interfaces/IRecipe";

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
  let professionSkillTiers = await getSkillTiersByProfession(professions[0]);
  let skillTierRecipes = await getRecipesBySkillTier(skillTier);
  let professionRecipes = await getRecipesByProfession(professions[2]);

  return {
    props: {
      professionIndex,
      professions,
      skillTier,
      professionSkillTiers,
      skillTierRecipes,
      professionRecipes,
    },
  };
};

export default function Home({
  professions,
  professionIndex,
  skillTier,
  professionSkillTiers,
  skillTierRecipes,
  professionRecipes,
}: {
  professions: Profession[];
  professionIndex: ProfessionIndex;
  skillTier: SkillTier;
  professionSkillTiers: SkillTier[];
  skillTierRecipes: Recipe[];
  professionRecipes: Recipe[];
}) {
  console.log(professionRecipes);
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
