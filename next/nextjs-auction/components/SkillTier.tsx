import React from "react";
import collapsible from "../styles/collapsible.module.css";
import { Blacksmithing } from "../interfaces/IBlacksmithing";

export default function SkillTier(props: any) {
  let index = props.blacksmithingState.skillTiers.indexOf(props.skillTier);

  function handleToggle() {
    const nextSkillTiers = props.blacksmithingState.skillTiers.map(
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
      skillTiers: nextSkillTiers,
    });
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
            <li>{recipe.name}</li>
          ))}
        </ul>
      ))}
    </li>
  );
}
