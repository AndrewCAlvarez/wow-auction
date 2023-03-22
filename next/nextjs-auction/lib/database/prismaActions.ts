import { Auction } from "../../interfaces/IAuction";
import { getAuctions } from "../blizzard/auction";
import {
  getProfessionIndex,
  getProfessions,
  getRecipesBySkillTier,
  getSkillTiersByProfession,
} from "../blizzard/profession";
import prisma from "../prisma";

export async function updateProfessionDb() {
  let professionIndex = await getProfessionIndex();
  let professions = await getProfessions(professionIndex);
  const addProfessions = await prisma.profession.createMany({
    data: professions.map((profession) => ({
      professionId: profession.id,
      name: profession.name,
    })),
  });
  let professionSkillTiers = await getSkillTiersByProfession(professions[2]);
  // let skillTierRecipes = await getRecipesBySkillTier(professions[2], skillTier);
  for (let skillTier of professionSkillTiers) {
    // 2822 (Dragonflight) recipes do not contain item ids
    if (skillTier.id !== 2822) {
      try {
        let skillTierRecipes = await getRecipesBySkillTier(
          professions[2],
          skillTier
        );
        const addRecipes = await prisma.recipe.createMany({
          data: skillTierRecipes.map((recipe) => {
            if (recipe.alliance_crafted_item) {
              return {
                data: JSON.stringify(recipe),
                professionId: recipe.professionId,
                allianceItemId: recipe.alliance_crafted_item.id,
                hordeItemId: recipe.horde_crafted_item?.id,
                category: recipe.category,
                skillTierId: recipe.skillTierId,
                skillTierName: recipe.skillTierName,
                name: recipe.name,
              };
            }
            return {
              data: JSON.stringify(recipe),
              professionId: recipe.professionId,
              itemId: recipe.crafted_item?.id,
              category: recipe.category,
              skillTierId: recipe.skillTierId,
              skillTierName: recipe.skillTierName,
              name: recipe.name,
            };
          }),
          skipDuplicates: true,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}

export async function updateAuctionDb() {
  const auctions: Auction[] = await getAuctions();
  console.log(auctions);

  const addAuctions = await prisma.auction.createMany({
    data: auctions.map((auction) => ({
      auctionId: auction.id,
      itemId: auction.item.id,
      quantity: auction.quantity,
      buyout: auction.buyout,
    })),
    skipDuplicates: true,
  });
}
