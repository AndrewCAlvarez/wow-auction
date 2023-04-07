import { useRouter } from "next/router";
import {
  getAllRecipeIds,
  getRecipeData,
} from "../../lib/database/prismaActions";
import Layout from "../../components/layout";

export async function getStaticPaths() {
  const paths = await getAllRecipeIds();
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const recipeData = await getRecipeData(params.id);
  console.log(recipeData);
  return {
    props: {
      recipeData,
    },
  };
}

export default function Recipe() {
  return <Layout>Recipe</Layout>;
}
