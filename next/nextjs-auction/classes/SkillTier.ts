import { SkillTierCategory } from "./SkillTierCategory";

export class SkillTier {
  id: number;
  name: string;
  categories: SkillTierCategory[];

  constructor(id: number, name: string, categories: SkillTierCategory[]) {
    this.id = id;
    this.name = name;
    this.categories = categories;
  }
}
