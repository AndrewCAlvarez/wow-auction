import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { useState } from "react";
import { getProfessionData } from "../lib/blizzard/profession";
import Test from "./test";
import { getAccessToken, getCommodities } from "../lib/data-retrieval";
import SkillTierSummary from "../components/skillTierSummary";
import { avoidRateLimit } from "../lib/avoidRateLimit";
import { getRecipe } from "../lib/blizzard/profession";

export default function Home({ professionData }) {
  const [skillTier, setSkillTier] = useState(professionData.allSkillTiers[0]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);

  function handleChangeTier(skillTier) {
    setSkillTier(skillTier);
    console.log(skillTier.name);
  }

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
      </ul>
    </>
  );
}

export async function getStaticProps() {
  let professionData;

  try {
    // const auctions = await prisma.auction.findMany();
    // const commodities = await prisma.commodity.findMany();
    professionData = await getProfessionData();

    return {
      props: {
        professionData,
      },
    };
  } catch (error) {
    console.log(error);
  }
  return { props: { professionData } };
}
