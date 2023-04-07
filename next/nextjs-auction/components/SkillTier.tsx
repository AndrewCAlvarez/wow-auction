import React from "react";
import collapsible from "../styles/collapsible.module.css";
import professionMenu from "../styles/professionMenu.module.css";
import Link from "next/link";

export default function SkillTier(props: any) {
  let index = props.blacksmithingState.skillTiers.indexOf(props.skillTier);

  function handleToggle() {
    const newSkillTiers = props.blacksmithingState.skillTiers.map(
      (skillTier: any) => {
        if (skillTier === props.skillTier) {
          return {
            ...skillTier,
            toggleMenu: !props.blacksmithingState.skillTiers[index].toggleMenu,
          };
        }
        return skillTier;
      }
    );
    props.setBlacksmithingState({
      ...props.blacksmithingState,
      skillTiers: newSkillTiers,
    });
  }

  function handleSelectRecipe(recipe: any) {
    props.setSelectedRecipe(recipe);
  }

  return (
    <li>
      {/* <SkillTierHeading name={props.skillTier.name} /> */}
      <button className={collapsible.collapsible} onClick={handleToggle}>
        {props.skillTier.name}
      </button>
      {props.skillTier.categories.map((category: any) => (
        <ul
          className={
            props.blacksmithingState.skillTiers[index].toggleMenu
              ? collapsible.block
              : collapsible.hidden
          }
        >
          <li>{category.name}</li>
          {category.recipes.map((recipe: any) => (
            <li>
              <Link
                href={"/recipes/" + recipe.id}
                className={professionMenu.button}
                onClick={() => handleSelectRecipe(recipe)}
              >
                {recipe.name} (
                {
                  props.auctions.filter(
                    (auction: any) => auction.itemId === recipe.itemId
                  ).length
                }
                )
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </li>
  );
}
