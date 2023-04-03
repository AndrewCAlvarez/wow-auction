import React from "react";
import SkillTierHeading from "./SkillTierHeading";
import collapsible from "../styles/collapsible.module.css";
import { Blacksmithing } from "../interfaces/IBlacksmithing";

export default function SkillTier(props: any) {
  let index = props.blacksmithingState.skillTiers.indexOf(props.skillTier);

  function handleToggle() {
    // This works, but I think it's wrong. This may be directly mutating
    // the blacksmithingState object.
    let newState: Blacksmithing = props.blacksmithingState;
    newState.skillTiers[index].toggleMenu =
      !newState.skillTiers[index].toggleMenu;

    props.setBlacksmithingState({
      ...props.blacksmithingState,
    });
    console.log(props.blacksmithingState.skillTiers[index]);
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
