import Link from "next/link";
import Layout from "../../components/layout";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { getAccessToken } from "../../lib/data-retrieval";
import { getSkillTier, getSkillTiers } from "../../lib/blizzard/profession";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Blacksmithing
  const professionId = 164;
  let accessToken = await getAccessToken(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.GRANT_TYPE
  );
  let skillTierIndex = await getSkillTiers(accessToken, professionId);
  console.log(skillTierIndex);
  let skillTier = await getSkillTier(
    accessToken,
    skillTierIndex.skill_tiers[0].id,
    professionId
  );
  console.log(skillTier);
  return {
    props: skillTierIndex,
    skillTier,
  };
};

export default function Blacksmithing(skillTierIndex) {
  const [state, setState] = useState({
    title: "Dragon Isles Blacksmithing",
  });
  console.log(skillTierIndex.name);
  return (
    <section>
      <Head>
        <title>Blacksmithing</title>
      </Head>
      <header>
        <nav>
          <ul>
            <li>
              {skillTierIndex.name}
              <ul>
                {skillTierIndex.skill_tiers.map((tier) => (
                  <Link href="#">
                    <li>{tier.name}</li>
                  </Link>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </header>
      <h1>Blacksmithing</h1>
      <h2>{state.title}</h2>
    </section>
  );
}
