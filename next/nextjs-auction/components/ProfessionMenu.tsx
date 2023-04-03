import React from "react";
import collapsible from "../styles/collapsible.module.css";
import SkillTier from "./SkillTier";

export default function ProfessionMenu(props: any) {
  return (
    <menu className={collapsible.collapsibleMenu}>
      <h1>{props.profession.profession.name}</h1>
      <ul>
        {props.blacksmithingState.skillTiers.map((skillTier: any) => (
          <SkillTier
            skillTier={skillTier}
            blacksmithingState={props.blacksmithingState}
            setBlacksmithingState={props.setBlacksmithingState}
          />
        ))}
      </ul>
    </menu>
  );
}
