import { useRouter } from "next/router";
import prisma from "../../lib/prisma";
import { getProfessionData, getRecipe } from "../../lib/blizzard/profession";
import { getItemMedia } from "../../lib/blizzard/media";
import { dragonIslesRecipes } from "../../lib/dragonIslesCraftedItems";

export async function getStaticPaths() {
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

  const staticPaths = recipes;
  return {
    paths: staticPaths,
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  console.log(context);
  const recipeId = context.params.rid;
  const recipe = await getRecipe(recipeId);

  // const media = await getItemMedia(recipe.crafted_item.id);
  // console.log(media);
  if (dragonIslesRecipes.find((recipe) => recipe.RecipeId == recipeId)) {
    const dragonIslesRecipe = dragonIslesRecipes.find(
      (recipe) => recipe.RecipeId == recipeId
    );
    console.log(dragonIslesRecipe.Id);
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
}

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
