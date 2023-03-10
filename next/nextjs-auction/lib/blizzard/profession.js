// this file should be dedicated to getting a list of profession items
// and materials used to craft those items
// get recipes from skill tier with profession id + skill tier id
// Iterate through all recipes and add all unique items required to db
// Hard-code blacksmithing and dragonflight skill tier

import { getAccessToken } from "../data-retrieval";

// A skill tier is the id of a profession for a specific expansion.
export async function getSkillTiers(accessToken, professionId) {
  const url = `https://${process.env.HOST_NAME}/data/wow/profession/${professionId}?${process.env.NAMESPACE_STATIC}&access_token=${accessToken.access_token}`;

  try {
    let skillTiers;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        skillTiers = data;
      });

    return skillTiers;
  } catch (error) {
    console.error(error);
  }
}

// Skill tier recipes include all recipes for an expansion
export async function getSkillTier(accessToken, skillTierId, professionId) {
  // Blacksmithing id is 164
  const url = `https://${process.env.HOST_NAME}/data/wow/profession/${professionId}/skill-tier/${skillTierId}?${process.env.NAMESPACE_STATIC}&access_token=${accessToken.access_token}`;

  try {
    let skillTier;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        skillTier = data;
      });

    return skillTier;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllSkillTiers(
  accessToken,
  skillTierIndex,
  professionId
) {
  let allSkillTiers;
  let skillTierPromises = await skillTierIndex.skill_tiers.map((skillTier) =>
    getSkillTier(accessToken, skillTier.id, professionId)
  );
  await Promise.all(skillTierPromises).then((data) => {
    allSkillTiers = data;
  });

  return allSkillTiers;
}

export async function getRecipe(recipeId) {
  const accessToken = await getAccessToken();
  const url = `https://${process.env.HOST_NAME}/data/wow/recipe/${recipeId}?${process.env.NAMESPACE_STATIC}&access_token=${accessToken.access_token}`;

  try {
    let recipe;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        recipe = data;
      });

    return recipe;
  } catch (error) {
    console.error(error);
  }
}

export async function getRecipes(skillTier) {
  let recipes = [];

  skillTier.categories.map((category) => {
    category.recipes.map((recipe) => {
      recipes.push(recipe);
    });
  });

  return recipes;
}

export async function getAllRecipes(accessToken, skillTierIndex, professionId) {
  let allRecipes = [];
  let allSkillTiers = await getAllSkillTiers(
    accessToken,
    skillTierIndex,
    professionId
  );
  // consider using the key given (an href) and attaching the access token instead of getting ids everywhere
  allSkillTiers.map((skillTier) => {
    skillTier.categories.map((category) => {
      category.recipes.map((recipe) => {
        allRecipes.push([recipe.key, recipe.name, recipe.id]);
      });
    });
  });

  return allRecipes;
}

export async function getSkillTierReagents(accessToken, skillTier) {
  // Iterate through all [recipes] in a skill tier and get the recipe by the id.
  // In each recipe, add the reagent to the reagent list if not listed
  let recipes = getRecipes(skillTier);

  let promises = [];
  // recipes.forEach((recipe) => {
  //   promises.push(5);
  // });
}

export async function getAllReagents(professionId) {
  let accessToken = await getAccessToken();
  let skillTierIndex = await getSkillTiers(accessToken, professionId);
  const allSkillTiers = await getAllSkillTiers(
    accessToken,
    skillTierIndex,
    professionId
  );

  setTimeout(() => {
    console.log("fetch1");
  }, 1000);
  setTimeout(() => {
    console.log("fetch2");
  }, 2000);
  setTimeout(() => {
    console.log("fetch3");
  }, 3000);
  setTimeout(() => {
    console.log("fetch4");
  }, 4000);

  let delay = 50;
  let recipes = await allSkillTiers.map((skillTier) => {
    skillTier.categories.map((category) =>
      category.recipes.map((recipe) => {
        let reagents = [];
        try {
          delay += 100;
          setTimeout(() => {
            fetch(recipe.key.href + "&access_token=" + accessToken.access_token)
              .then((response) => response.json())
              .then((recipe) => {
                console.log(recipe.reagents);
                reagents.push(recipe.reagents);
              });
          }, delay);
          return reagents;
        } catch (error) {
          console.log(error);
        }
        return 0;
      })
    );

    return {
      name: skillTier.name,
      reagents: 6,
    };
  });

  // recipes = await Promise.all(recipes).then((recipesData) => recipesData);

  const reagents = recipes;

  return reagents;
}

// This function is what is primarily called externally
export async function getProfessionData() {
  // Blacksmithing
  const professionId = 164;
  const accessToken = await getAccessToken(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.GRANT_TYPE
  );
  const skillTierIndex = await getSkillTiers(accessToken, professionId);
  const skillTier = await getSkillTier(
    accessToken,
    skillTierIndex.skill_tiers[9].id,
    professionId
  );

  const recipes = await getRecipes(skillTier);

  const allRecipes = await getAllRecipes(
    accessToken,
    skillTierIndex,
    professionId
  );

  // let reagents = await getSkillTierReagents(accessToken, skillTier);

  const allSkillTiers = await getAllSkillTiers(
    accessToken,
    skillTierIndex,
    professionId
  );

  // const reagents = await getAllReagents(professionId);

  return {
    skillTierIndex,
    skillTier,
    allSkillTiers,
    recipes,
    allRecipes,
    // reagents,
  };
}
