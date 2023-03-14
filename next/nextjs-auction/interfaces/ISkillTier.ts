export interface SkillTier {
  _links: {
    self: {
      href: string;
    };
  };
  id: number;
  name: string;
  minimum_skill_level: number;
  maximum_skill_level: number;
  categories: {
    name: string;
    recipes: {
      key: {
        href: string;
      };
      name: string;
      id: number;
    }[];
  }[];
}
