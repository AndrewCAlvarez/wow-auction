import { Auction } from "./IAuction";

export interface Blacksmithing {
  professionId: 164;
  skillTiers: [
    {
      name: string;
      id: number;
      categories: [
        {
          name: string;
          recipes: [
            {
              id: number;
              name: string;
              itemId?: number;
              allianceItemId?: number;
              hordeItemId?: number;
              data: JSON;
              auctions?: Auction[];
            }
          ];
        }
      ];
      toggleMenu: boolean;
    }
  ];
}

export function createBlacksmithingObject(blacksmithingRecipes: any) {
  let blacksmithing: Blacksmithing = {
    professionId: 164,
    skillTiers: [
      {
        name: "",
        id: 0,
        categories: [
          {
            name: "",
            recipes: [
              {
                id: 0,
                name: "",
                itemId: 0,
                allianceItemId: 0,
                hordeItemId: 0,
                data: JSON,
              },
            ],
          },
        ],
        toggleMenu: false,
      },
    ],
  };
  for (let recipe of blacksmithingRecipes) {
    if (
      blacksmithing.skillTiers.find(
        (skillTier) => skillTier.name === recipe.skillTierName
      ) === undefined
    ) {
      blacksmithing.skillTiers.push({
        name: recipe.skillTierName,
        id: recipe.skillTierId,
        categories: [
          {
            name: recipe.category,
            recipes: [{ id: recipe.id, name: recipe.name, data: recipe.data }],
          },
        ],
        toggleMenu: false,
      });
    }
    let skillTierIndex = blacksmithing.skillTiers.findIndex(
      (skilTier) => skilTier.name === recipe.skillTierName
    );
    if (
      blacksmithing.skillTiers[skillTierIndex].categories.find(
        (category) => category.name === recipe.category
      ) === undefined
    ) {
      blacksmithing.skillTiers[skillTierIndex].categories.push({
        name: recipe.category,
        recipes: [{ id: recipe.id, name: recipe.name, data: recipe.data }],
      });
    } else {
      let categoryIndex = blacksmithing.skillTiers[
        skillTierIndex
      ].categories.findIndex((category) => category.name === recipe.category);

      if (recipe.itemId) {
        blacksmithing.skillTiers[skillTierIndex].categories[
          categoryIndex
        ].recipes.push({
          id: recipe.id,
          itemId: recipe.itemId,
          name: recipe.name,
          data: recipe.data,
        });
      }
      if (recipe.allianceItemId) {
        blacksmithing.skillTiers[skillTierIndex].categories[
          categoryIndex
        ].recipes.push({
          id: recipe.id,
          allianceItemId: recipe.allianceItemId,
          hordeItemId: recipe.hordeItemId,
          name: recipe.name,
          data: recipe.data,
        });
      }
    }
  }
  blacksmithing.skillTiers.shift();
  return blacksmithing;
}
