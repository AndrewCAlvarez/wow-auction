export interface IProfession {
  id: number;
  skillTiers: [
    {
      skillTier: {
        id: number;
        categories: [
          {
            name: string;
            recipes: [
              {
                name: string;
                key: { href: string };
              }
            ];
          }
        ];
      };
    }
  ];
}
