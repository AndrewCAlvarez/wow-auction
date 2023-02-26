import Link from "next/link";
import Layout from "../../components/layout";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { getAccessToken } from "../../lib/data-retrieval";
import {
  getRecipe,
  getSkillTier,
  getSkillTierReagents,
  getSkillTiers,
  getRecipes,
  getProfessionData,
} from "../../lib/blizzard/profession";
import { useState } from "react";
import Table from "../../components/newTable";
import { getMiningAuctions } from "../../lib/data-retrieval";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let professionData = getProfessionData();

  return {
    props: professionData,
  };
};

export default function Blacksmithing(profession) {
  const [state, setState] = useState({
    // title: "Dragon Isles Blacksmithing",
  });

  const tableRows = profession.recipes.map((recipe) => {
    return [recipe.name];
  });

  return (
    <section>
      <Head>
        <title>Blacksmithing</title>
      </Head>
      <header>
        <nav>
          <ul>
            {profession.skillTierIndex.skill_tiers.map((tier) => (
              <Link href="#">
                <li>{tier.name}</li>
              </Link>
            ))}
          </ul>
        </nav>
      </header>
      <h1>Blacksmithing</h1>
      <h2>{profession.skillTier.name}</h2>
      <h3>Recipes</h3>
      <Table tableHeaders={["name"]} tableRows={tableRows} />
    </section>
  );
}
