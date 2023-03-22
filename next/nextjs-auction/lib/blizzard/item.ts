import { Recipe } from "../../interfaces/IRecipe";
import { getAccessToken } from "../accessToken";
import { sleep } from "../avoidRateLimit";

export async function getItemById(recipe: Recipe) {
  await sleep(100);
  const accessToken = await getAccessToken();
  const url = `https://${process.env.HOST_NAME}/data/wow/item/${recipe.crafted_item?.id}?namespace=static-us&locale=en_US&access_token=${accessToken.access_token}`;
  return fetch(url)
    .then((response) => {
      if (response.status !== 200) console.log(response);
      return response.json();
    })
    .then((data) => data);
}
