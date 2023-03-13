import { useRouter } from "next/router";
import prisma from "../../lib/prisma";
import { getProfessionData, getRecipe } from "../../lib/blizzard/profession";
import { getItemMedia } from "../../lib/blizzard/media";
import { dragonIslesRecipes } from "../../lib/dragonIslesCraftedItems";
import { avoidRateLimit } from "../../lib/avoidRateLimit";
import { GetStaticPaths, GetStaticProps } from "next/types";

export const getStaticPaths: GetStaticPaths = async () => {
  const professionData = await getProfessionData();
  const recipes = [];

  // Populates recipes[] which is used to generate static paths
  professionData.allSkillTiers.map((skillTier) => {
    skillTier.categories.map((category) => {
      category.recipes.map((recipe) =>
        recipes.push({ params: { rid: recipe.id.toString() } })
      );
    });
  });

  // Removes two recipes, a quest item and recrafting
  recipes.splice(
    recipes.findIndex((recipe) => recipe.params.rid === "47653"),
    1
  );
  recipes.splice(
    recipes.findIndex((recipe) => recipe.params.rid === "47340"),
    1
  );

  const staticPaths = recipes;
  return {
    paths: staticPaths,
    fallback: false, // can also be true or 'blocking'
  };
};

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps: GetStaticProps = async (context) => {
  const recipeId = context.params.rid;
  // Delay used to slow down NextJs build to avoid making too many external api calls
  await avoidRateLimit();
  const recipe = await getRecipe(recipeId);

  // const media = await getItemMedia(recipe.crafted_item.id);
  // console.log(media);
  if (dragonIslesRecipes.find((recipe) => recipe.RecipeId == recipeId)) {
    const dragonIslesRecipe = dragonIslesRecipes.find(
      (recipe) => recipe.RecipeId == recipeId
    );
    const auctions = await prisma.auction.findMany({
      where: {
        itemId: dragonIslesRecipe.Id,
      },
    });

    return {
      // Passed to the page component as props
      props: {
        auctions: auctions.map((auction) => ({
          id: auction.id,
          itemId: auction.itemId,
          quantity: auction.quantity,
          buyout: Number(auction.buyout),
        })),
        recipe: recipe,
      },
    };
  }
  // This means the recipe is from BFA and has two distinct items for Horde and Alliance
  if (Object.hasOwn(recipe, "alliance_crafted_item")) {
    let auctions = [];
    const allianceAuctions = await prisma.auction.findMany({
      where: {
        itemId: recipe.alliance_crafted_item.id,
      },
    });
    const hordeAuctions = await prisma.auction.findMany({
      where: {
        itemId: recipe.horde_crafted_item.id,
      },
    });

    auctions = allianceAuctions.concat(hordeAuctions);

    return {
      // Passed to the page component as props
      props: {
        auctions: auctions.map((auction) => ({
          id: auction.id,
          itemId: auction.itemId,
          quantity: auction.quantity,
          buyout: Number(auction.buyout),
        })),
        recipe: recipe,
      },
    };
  } else {
    const auctions = await prisma.auction.findMany({
      where: {
        itemId: recipe.crafted_item.id,
      },
    });

    return {
      // Passed to the page component as props
      props: {
        auctions: auctions.map((auction) => ({
          id: auction.id,
          itemId: auction.itemId,
          quantity: auction.quantity,
          buyout: Number(auction.buyout),
        })),
        recipe: recipe,
      },
    };
  }
};

export default function Recipe({ recipe, auctions }) {
  const router = useRouter();
  const { rid } = router.query;

  return (
    <section>
      <h1>
        {/* <img src={media.assets[0].value} /> */}
        {recipe.name}
      </h1>
      <h2>Auctions</h2>
      <ul>
        {auctions.map((auction) => (
          <li>
            quantity: {auction.quantity} buyout: {auction.buyout}
          </li>
        ))}
      </ul>
    </section>
  );
}
