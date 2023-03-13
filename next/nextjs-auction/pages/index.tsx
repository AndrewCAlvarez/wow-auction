import Link from "next/link";
import { useState } from "react";
import {
  getProfessionData,
  getProfessionIndex,
  getProfessions,
} from "../lib/blizzard/profession";
import SkillTierSummary from "../components/skillTierSummary";

export default function Home({ professions }) {
  console.log(JSON.parse(professions));
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

export async function getStaticProps() {
  let professions;

  try {
    // const auctions = await prisma.auction.findMany();
    // const commodities = await prisma.commodity.findMany();
    // professionData = await getProfessionData();
    professions = await getProfessions();

    return {
      props: {
        professions: JSON.stringify(professions),
      },
    };
  } catch (error) {
    console.log(error);
  }
  return { props: { professions } };
}
