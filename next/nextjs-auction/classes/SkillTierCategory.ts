import { Recipe } from "./Recipe";

export class SkillTierCategory {
  name: string;
  recipes: Recipe[];

  constructor(name: string, recipes: Recipe[]) {
    this.name = name;
    this.recipes = recipes;
  }
}
