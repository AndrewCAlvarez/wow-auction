export interface Profession {
  id: number;
  name: string;
  key: { href: string };
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
